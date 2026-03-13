export const FAVORITES_STORAGE_KEY = 'ttt-favorites';
export const FAVORITES_CHANGED_EVENT = 'ttt:favorites-changed';

interface FavoriteRecord {
  slug: string;
  favoritedAt: number;
}

function normalizeFavoriteRecords(parsed: unknown): FavoriteRecord[] {
  if (!Array.isArray(parsed)) return [];

  const recordMap = new Map<string, FavoriteRecord>();

  parsed.forEach((entry, index) => {
    if (typeof entry === 'string') {
      if (!entry) return;
      const existing = recordMap.get(entry);
      if (!existing) {
        recordMap.set(entry, { slug: entry, favoritedAt: index + 1 });
      }
      return;
    }

    if (!entry || typeof entry !== 'object') return;

    const slug = 'slug' in entry && typeof entry.slug === 'string' ? entry.slug : '';
    const favoritedAt = 'favoritedAt' in entry && typeof entry.favoritedAt === 'number' && Number.isFinite(entry.favoritedAt)
      ? entry.favoritedAt
      : 0;

    if (!slug) return;

    const existing = recordMap.get(slug);
    if (!existing || favoritedAt >= existing.favoritedAt) {
      recordMap.set(slug, { slug, favoritedAt });
    }
  });

  return [...recordMap.values()].sort((a, b) => a.favoritedAt - b.favoritedAt);
}

function readFavoriteRecords(): FavoriteRecord[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    return normalizeFavoriteRecords(JSON.parse(raw));
  } catch {
    return [];
  }
}

function writeFavoriteRecords(records: FavoriteRecord[]): void {
  if (typeof window === 'undefined') return;

  const normalized = normalizeFavoriteRecords(records).map(record => ({
    slug: record.slug,
    favoritedAt: record.favoritedAt,
  }));

  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // Storage unavailable or quota exceeded — still notify with in-memory state
  }

  notifyFavoritesChanged(normalized.map(record => record.slug));
}

export function readFavorites(): string[] {
  return readFavoriteRecords().map(record => record.slug);
}

export function readFavoriteTimestamps(): Record<string, number> {
  const timestamps: Record<string, number> = {};

  readFavoriteRecords().forEach(record => {
    if (record.favoritedAt > 0) {
      timestamps[record.slug] = record.favoritedAt;
    }
  });

  return timestamps;
}

export function writeFavorites(favorites: string[]): void {
  const existingTimestamps = readFavoriteTimestamps();
  const normalized = Array.from(new Set(favorites.filter(value => typeof value === 'string')));
  let nextTimestamp = Date.now();

  const records = normalized.map(slug => {
    const existing = existingTimestamps[slug];
    if (existing) {
      return { slug, favoritedAt: existing };
    }

    nextTimestamp += 1;
    return { slug, favoritedAt: nextTimestamp };
  });

  writeFavoriteRecords(records);
}

export function isFavorited(slug: string): boolean {
  return readFavorites().includes(slug);
}

export function toggleFavorite(slug: string): boolean {
  if (!slug) return false;

  const records = readFavoriteRecords();
  const index = records.findIndex(record => record.slug === slug);

  if (index === -1) {
    records.push({ slug, favoritedAt: Date.now() });
    writeFavoriteRecords(records);
    return true;
  }

  records.splice(index, 1);
  writeFavoriteRecords(records);
  return false;
}

export function notifyFavoritesChanged(favorites = readFavorites()): void {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new CustomEvent(FAVORITES_CHANGED_EVENT, {
    detail: { favorites },
  }));
}

let activeFavoriteConfirm: Promise<boolean> | null = null;

export function confirmFavoriteRemoval(toolName: string): Promise<boolean> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.resolve(true);
  }

  if (activeFavoriteConfirm) return activeFavoriteConfirm;

  activeFavoriteConfirm = new Promise<boolean>((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'ttt-favorite-confirm-overlay';

    const dialog = document.createElement('div');
    dialog.className = 'ttt-favorite-confirm-dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'Confirm remove favorite');

    const title = document.createElement('h3');
    title.className = 'ttt-favorite-confirm-title';
    title.textContent = 'Remove favorite?';

    const message = document.createElement('p');
    message.className = 'ttt-favorite-confirm-message';
    message.textContent = `Remove ${toolName} from favorites?`;

    const actions = document.createElement('div');
    actions.className = 'ttt-favorite-confirm-actions';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'ttt-favorite-confirm-btn ttt-favorite-confirm-cancel';
    cancelBtn.textContent = 'Cancel';

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'ttt-favorite-confirm-btn ttt-favorite-confirm-remove';
    removeBtn.textContent = 'Remove';

    actions.append(cancelBtn, removeBtn);
    dialog.append(title, message, actions);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    const styleId = 'ttt-favorite-confirm-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .ttt-favorite-confirm-overlay {
          position: fixed;
          inset: 0;
          background: color-mix(in srgb, var(--color-bg, #0f0e17) 42%, transparent);
          backdrop-filter: blur(3px);
          display: grid;
          place-items: center;
          z-index: 10000;
          padding: 1rem;
        }
        .ttt-favorite-confirm-dialog {
          width: min(100%, 380px);
          background: var(--color-bg-card, #1a1932);
          color: var(--color-text, #fffffe);
          border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
          border-radius: var(--radius, 12px);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
          padding: 1rem;
        }
        .ttt-favorite-confirm-title {
          font-size: 1.05rem;
          margin: 0 0 0.4rem;
        }
        .ttt-favorite-confirm-message {
          margin: 0;
          color: var(--color-text-muted, #a7a9be);
        }
        .ttt-favorite-confirm-actions {
          margin-top: 1rem;
          display: flex;
          justify-content: flex-end;
          gap: 0.55rem;
        }
        .ttt-favorite-confirm-btn {
          font: inherit;
          border-radius: 999px;
          border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
          background: var(--color-bg-card, #1a1932);
          color: var(--color-text, #fffffe);
          padding: 0.38rem 0.8rem;
          cursor: pointer;
        }
        .ttt-favorite-confirm-btn:hover,
        .ttt-favorite-confirm-btn:focus-visible {
          border-color: var(--color-primary, #ff8906);
          outline: none;
        }
        .ttt-favorite-confirm-remove {
          background: var(--color-secondary, #f25f4c);
          border-color: var(--color-secondary, #f25f4c);
          color: #fff;
        }
      `;
      document.head.appendChild(style);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const cleanup = () => {
      document.body.style.overflow = previousOverflow;
      overlay.remove();
      window.removeEventListener('keydown', onEscape);
      activeFavoriteConfirm = null;
    };

    const finish = (result: boolean) => {
      cleanup();
      resolve(result);
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish(false);
    };

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) finish(false);
    });
    cancelBtn.addEventListener('click', () => finish(false));
    removeBtn.addEventListener('click', () => finish(true));
    window.addEventListener('keydown', onEscape);
    cancelBtn.focus();
  });

  return activeFavoriteConfirm;
}
