const STORAGE_KEY = 'ttt-favorites';
const CHANGE_EVENT = 'ttt:favorites-changed';
const FAVORITES_TABLE = 'favorites';

type RemoteFavoriteClient = {
  from: (table: string) => {
    select: (columns: string) => {
      eq: (column: string, value: string) => Promise<{ data: Array<{ tool_slug?: string | null }> | null; error: unknown }>;
    };
    upsert: (values: Array<{ user_id: string; tool_slug: string }>, options: { onConflict: string; ignoreDuplicates: boolean }) => Promise<{ error: unknown }>;
    delete: () => {
      eq: (column: string, value: string) => {
        eq: (column: string, value: string) => Promise<{ error: unknown }>;
      };
    };
  };
};

let remoteSync: { client: RemoteFavoriteClient; userId: string } | null = null;
let remoteQueue: Promise<void> = Promise.resolve();

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function readFavorites(): string[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const values = parsed.filter((value): value is string => typeof value === 'string' && value.length > 0);
    return [...new Set(values)];
  } catch {
    return [];
  }
}

function writeFavorites(values: string[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  } catch {
    // Ignore storage write failures (private mode or quota limits).
  }
}

function emitChange(values: string[]): void {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { favorites: values } }));
}

function normalizeFavoriteIds(values: string[]): string[] {
  return [...new Set(values.filter(value => typeof value === 'string' && value.length > 0))];
}

async function fetchRemoteFavorites(client: RemoteFavoriteClient, userId: string): Promise<string[]> {
  const { data, error } = await client
    .from(FAVORITES_TABLE)
    .select('tool_slug')
    .eq('user_id', userId);

  if (error || !data) {
    return [];
  }

  return normalizeFavoriteIds(data.map((item) => item.tool_slug || '').filter(Boolean));
}

async function upsertRemoteFavorites(client: RemoteFavoriteClient, userId: string, toolIds: string[]): Promise<void> {
  if (toolIds.length === 0) return;
  await client
    .from(FAVORITES_TABLE)
    .upsert(
      toolIds.map(toolId => ({ user_id: userId, tool_slug: toolId })),
      { onConflict: 'user_id,tool_slug', ignoreDuplicates: true }
    );
}

async function removeRemoteFavorite(client: RemoteFavoriteClient, userId: string, toolId: string): Promise<void> {
  await client
    .from(FAVORITES_TABLE)
    .delete()
    .eq('user_id', userId)
    .eq('tool_slug', toolId);
}

function queueRemoteMutation(toolId: string, favorited: boolean): void {
  if (!remoteSync) return;

  const { client, userId } = remoteSync;
  remoteQueue = remoteQueue
    .then(async () => {
      if (favorited) {
        await upsertRemoteFavorites(client, userId, [toolId]);
      } else {
        await removeRemoteFavorite(client, userId, toolId);
      }
    })
    .catch(() => {
      // Keep local favorites as source of truth when remote sync fails.
    });
}

export function getFavoriteIds(): string[] {
  return readFavorites();
}

export function isFavorite(toolId: string): boolean {
  return readFavorites().includes(toolId);
}

export function setFavorite(toolId: string, favorited: boolean): boolean {
  const ids = readFavorites();
  const exists = ids.includes(toolId);

  if (favorited && !exists) ids.push(toolId);
  if (!favorited && exists) {
    const next = ids.filter(id => id !== toolId);
    writeFavorites(next);
    emitChange(next);
    queueRemoteMutation(toolId, false);
    return false;
  }

  const next = normalizeFavoriteIds(ids);
  writeFavorites(next);
  emitChange(next);
  queueRemoteMutation(toolId, favorited);
  return favorited;
}

export function toggleFavorite(toolId: string): boolean {
  const nextState = !isFavorite(toolId);
  return setFavorite(toolId, nextState);
}

export function onFavoritesChanged(handler: (favorites: string[]) => void): () => void {
  if (!isBrowser()) return () => {};

  const customHandler = (event: Event) => {
    const detail = (event as CustomEvent<{ favorites?: string[] }>).detail;
    handler(Array.isArray(detail?.favorites) ? detail.favorites : getFavoriteIds());
  };

  const storageHandler = (event: StorageEvent) => {
    if (event.key && event.key !== STORAGE_KEY) return;
    handler(getFavoriteIds());
  };

  window.addEventListener(CHANGE_EVENT, customHandler as EventListener);
  window.addEventListener('storage', storageHandler);

  return () => {
    window.removeEventListener(CHANGE_EVENT, customHandler as EventListener);
    window.removeEventListener('storage', storageHandler);
  };
}

export async function enableRemoteFavoritesSync(client: RemoteFavoriteClient, userId: string): Promise<void> {
  const local = readFavorites();
  const remote = await fetchRemoteFavorites(client, userId);

  const merged = normalizeFavoriteIds([...local, ...remote]);
  const remoteOnly = merged.filter(toolId => !remote.includes(toolId));

  if (remoteOnly.length > 0) {
    await upsertRemoteFavorites(client, userId, remoteOnly);
  }

  writeFavorites(merged);
  emitChange(merged);
  remoteSync = { client, userId };
}

export function disableRemoteFavoritesSync(): void {
  remoteSync = null;
  remoteQueue = Promise.resolve();
}

