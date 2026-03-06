import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js';

export const FAVORITES_STORAGE_KEY = 'ttt-favorites';

type SyncStatus = 'idle' | 'local-only' | 'syncing' | 'synced' | 'error';

export interface ClientStateSnapshot {
  authEnabled: boolean;
  signedIn: boolean;
  user: User | null;
  favorites: string[];
  favoriteCount: number;
  syncStatus: SyncStatus;
  lastError: string | null;
}

type Listener = (snapshot: ClientStateSnapshot) => void;

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const authEnabled = Boolean(supabaseUrl && supabaseAnonKey);

const listeners = new Set<Listener>();

let initialized = false;
let initPromise: Promise<void> | null = null;
let supabase: SupabaseClient | null = null;
let currentUser: User | null = null;
let favorites = new Set<string>();
let syncStatus: SyncStatus = authEnabled ? 'idle' : 'local-only';
let lastError: string | null = null;

function snapshot(): ClientStateSnapshot {
  return {
    authEnabled,
    signedIn: Boolean(currentUser),
    user: currentUser,
    favorites: Array.from(favorites),
    favoriteCount: favorites.size,
    syncStatus,
    lastError,
  };
}

function notify(): void {
  const state = snapshot();
  for (const listener of listeners) {
    listener(state);
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ttt:state-changed', { detail: state }));
  }
}

function setError(message: string | null): void {
  lastError = message;
  if (message) {
    syncStatus = 'error';
  }
}

function normalizeSlug(slug: string): string {
  return slug.trim().replace(/^\/+|\/+$/g, '');
}

function readLocalFavorites(): Set<string> {
  if (typeof window === 'undefined') {
    return new Set<string>();
  }

  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) {
      return new Set<string>();
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      window.localStorage.removeItem(FAVORITES_STORAGE_KEY);
      return new Set<string>();
    }
    return new Set(
      parsed
        .filter((item) => typeof item === 'string')
        .map((item) => normalizeSlug(item))
        .filter(Boolean)
    );
  } catch {
    return new Set<string>();
  }
}

function writeLocalFavorites(next: Set<string>): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(next)));
}

async function listRemoteFavorites(userId: string): Promise<Set<string>> {
  if (!supabase) {
    return new Set<string>();
  }

  const { data, error } = await supabase
    .from('favorites')
    .select('tool_slug')
    .eq('user_id', userId);

  if (error) {
    throw error;
  }

  return new Set(
    (data || [])
      .map((row) => normalizeSlug(String(row.tool_slug || '')))
      .filter(Boolean)
  );
}

async function addRemoteFavorite(userId: string, toolSlug: string): Promise<void> {
  if (!supabase) {
    return;
  }

  const { error } = await supabase
    .from('favorites')
    .upsert(
      [{ user_id: userId, tool_slug: toolSlug }],
      { onConflict: 'user_id,tool_slug', ignoreDuplicates: true }
    );

  if (error) {
    throw error;
  }
}

async function removeRemoteFavorite(userId: string, toolSlug: string): Promise<void> {
  if (!supabase) {
    return;
  }

  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('tool_slug', toolSlug);

  if (error) {
    throw error;
  }
}

async function mergeRemoteWithLocal(user: User): Promise<void> {
  syncStatus = 'syncing';
  setError(null);
  notify();

  try {
    const remote = await listRemoteFavorites(user.id);
    const union = new Set<string>([...favorites, ...remote]);

    const missingRemote = Array.from(union).filter((slug) => !remote.has(slug));
    if (missingRemote.length > 0 && supabase) {
      const rows = missingRemote.map((toolSlug) => ({ user_id: user.id, tool_slug: toolSlug }));
      const { error } = await supabase
        .from('favorites')
        .upsert(rows, { onConflict: 'user_id,tool_slug', ignoreDuplicates: true });
      if (error) {
        throw error;
      }
    }

    favorites = union;
    writeLocalFavorites(favorites);
    syncStatus = 'synced';
    setError(null);
    notify();
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Failed to sync favorites');
    notify();
  }
}

async function refreshUserFromSession(): Promise<void> {
  if (!supabase) {
    currentUser = null;
    syncStatus = 'local-only';
    notify();
    return;
  }

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    currentUser = null;
    setError(error.message);
    notify();
    return;
  }

  currentUser = data.user;
  if (currentUser) {
    await mergeRemoteWithLocal(currentUser);
  } else {
    syncStatus = 'idle';
    notify();
  }
}

function handleStorageEvent(event: StorageEvent): void {
  if (event.key !== FAVORITES_STORAGE_KEY) {
    return;
  }
  favorites = readLocalFavorites();
  if (!authEnabled || !currentUser) {
    syncStatus = 'local-only';
  }
  notify();
}

export async function initClientState(): Promise<void> {
  if (initialized) {
    return;
  }
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    favorites = readLocalFavorites();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageEvent);
    }

    if (!authEnabled || typeof window === 'undefined') {
      syncStatus = 'local-only';
      initialized = true;
      notify();
      return;
    }

    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        flowType: 'pkce',
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });

    await refreshUserFromSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      currentUser = session?.user ?? null;
      if (!currentUser) {
        syncStatus = authEnabled ? 'idle' : 'local-only';
        notify();
        return;
      }

      void mergeRemoteWithLocal(currentUser);
    });

    initialized = true;
    notify();
  })();

  return initPromise;
}

export function subscribeClientState(listener: Listener): () => void {
  listeners.add(listener);
  listener(snapshot());
  return () => {
    listeners.delete(listener);
  };
}

export function getClientStateSnapshot(): ClientStateSnapshot {
  return snapshot();
}

export function isFavorited(toolSlug: string): boolean {
  return favorites.has(normalizeSlug(toolSlug));
}

export function getFavoriteSlugs(): string[] {
  return Array.from(favorites);
}

export async function setFavorite(toolSlug: string, shouldFavorite: boolean): Promise<boolean> {
  const slug = normalizeSlug(toolSlug);
  if (!slug) {
    return false;
  }

  const previous = new Set(favorites);
  if (shouldFavorite) {
    favorites.add(slug);
  } else {
    favorites.delete(slug);
  }

  writeLocalFavorites(favorites);
  if (!authEnabled || !currentUser) {
    syncStatus = 'local-only';
    setError(null);
    notify();
    return shouldFavorite;
  }

  syncStatus = 'syncing';
  setError(null);
  notify();

  try {
    if (shouldFavorite) {
      await addRemoteFavorite(currentUser.id, slug);
    } else {
      await removeRemoteFavorite(currentUser.id, slug);
    }
    syncStatus = 'synced';
    notify();
    return shouldFavorite;
  } catch (error) {
    favorites = previous;
    writeLocalFavorites(favorites);
    setError(error instanceof Error ? error.message : 'Failed to update favorite');
    notify();
    return previous.has(slug);
  }
}

export async function toggleFavorite(toolSlug: string): Promise<boolean> {
  return setFavorite(toolSlug, !isFavorited(toolSlug));
}

function sanitizeNextPath(nextPath: string | null): string {
  if (!nextPath) {
    return '/account/';
  }
  return nextPath.startsWith('/') ? nextPath : '/account/';
}

export async function signInWithGitHub(nextPath?: string): Promise<void> {
  await initClientState();
  if (!supabase) {
    throw new Error('Supabase auth is not configured');
  }

  const next = sanitizeNextPath(nextPath ?? (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/account/'));
  const redirectTo = typeof window !== 'undefined'
    ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
    : undefined;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo },
  });

  if (error) {
    throw error;
  }
}

export async function signOutUser(): Promise<void> {
  await initClientState();
  if (!supabase) {
    return;
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }

  currentUser = null;
  syncStatus = authEnabled ? 'idle' : 'local-only';
  notify();
}

export async function handleAuthCodeExchange(): Promise<{ nextPath: string; error: string | null }> {
  await initClientState();

  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const code = params.get('code');
  const nextPath = sanitizeNextPath(params.get('next'));

  if (!supabase) {
    return { nextPath, error: 'Supabase auth is not configured' };
  }
  if (!code) {
    return { nextPath, error: 'Missing OAuth code' };
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    setError(error.message);
    notify();
    return { nextPath, error: error.message };
  }

  await refreshUserFromSession();
  return { nextPath, error: null };
}