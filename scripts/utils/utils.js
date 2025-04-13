const FAVORITES_KEY = "favoriteMovies";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function getFavoritesIds() {
  return getFavorites().map((movie) => movie.imdbID);
}

export function toggleFavorite(movie) {
  let favorites = getFavorites();
  if (getFavoritesIds().includes(movie.imdbID)) {
    favorites = favorites.filter((m) => m.imdbID !== movie.imdbID);
  } else {
    favorites.push(movie);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
