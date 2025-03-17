import { fetchMovies } from "./modules/api.js";
import { setupCarousel } from "./modules/caroussel.js";
import {
  renderMovieGrid,
  renderFavorites,
  filterMovies,
  updateFavoriteIcons,
} from "./components/movieCard.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    window.movies = await fetchMovies();
    console.log("Movies loaded:", window.movies);
    const isFavoritesPage = window.location.pathname.includes("favorites.html");

    if (isFavoritesPage) {
      renderFavorites();
    } else {
      setupCarousel(window.movies);
      renderMovieGrid();

      document
        .getElementById("searchInput")
        .addEventListener("input", (event) => {
          filterMovies(event.target.value.trim().toLowerCase());
        });
    }

    updateFavoriteIcons();
  } catch (error) {
    console.error("Error initializing app:", error);
  }
});
