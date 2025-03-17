const FAVORITES_KEY = "favoriteMovies";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function toggleFavorite(movieId) {
  let favorites = getFavorites();
  if (favorites.includes(movieId)) {
    favorites = favorites.filter((id) => id !== movieId);
  } else {
    favorites.push(movieId);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
