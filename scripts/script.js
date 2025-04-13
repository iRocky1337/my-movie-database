import { fetchMovies } from "./modules/api.js";
import { setupCarousel } from "./modules/caroussel.js";
import {
  renderMovieGrid,
  renderFavorites,
  filterMovies,
  updateFavoriteIcons,
} from "./components/movieCard.js";
import { debounce } from "./utils/utils.js";

const filterMoviesDebounced = debounce(filterMovies, 500);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    window.movies = await fetchMovies();
    const isFavoritesPage = window.location.pathname.includes("favorites.html");

    if (isFavoritesPage) {
      renderFavorites();
    } else {
      setupCarousel(window.movies);
      renderMovieGrid();

      document
        .getElementById("searchInput")
        .addEventListener("input", (event) => {
          const val = event.target.value.trim().toLowerCase();
          filterMoviesDebounced(val);
        });
    }

    updateFavoriteIcons();
  } catch (error) {
    console.error("Error initializing app:", error);
  }
});
