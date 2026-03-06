export const FAVORITES_STORAGE_KEY = 'ttt-favorites';
export const FAVORITES_CHANGED_EVENT = 'ttt:favorites-changed';

export function readFavorites(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((value): value is string => typeof value === 'string');
  } catch {
    return [];
  }
}

export function writeFavorites(favorites: string[]): void {
  if (typeof window === 'undefined') return;

  const normalized = Array.from(new Set(favorites.filter(value => typeof value === 'string')));
  window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(normalized));
  notifyFavoritesChanged(normalized);
}

export function isFavorited(slug: string): boolean {
  return readFavorites().includes(slug);
}

export function toggleFavorite(slug: string): boolean {
  if (!slug) return false;

  const favorites = readFavorites();
  const index = favorites.indexOf(slug);

  if (index === -1) {
    favorites.push(slug);
    writeFavorites(favorites);
    return true;
  }

  favorites.splice(index, 1);
  writeFavorites(favorites);
  return false;
}

export function notifyFavoritesChanged(favorites = readFavorites()): void {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new CustomEvent(FAVORITES_CHANGED_EVENT, {
    detail: { favorites },
  }));
}
