import {
  getFavorites,
  getFavoritesIds,
  toggleFavorite,
} from "../utils/utils.js";

export function renderMovieGrid(movies = null) {
  const movieGrid = document.getElementById("movieGrid");
  if (!movieGrid || !window.movies) return;

  movieGrid.innerHTML = "";
  const moviesToShow =
    movies || window.movies.sort(() => 0.5 - Math.random()).slice(0, 12);

  moviesToShow.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" />
            <h3>${movie.Title}</h3>
            <span class="favorite-icon" data-id="${movie.imdbID}">
                ${getFavoritesIds().includes(movie.imdbID) ? "★" : "☆"}
            </span>
        `;

    card.querySelector(".favorite-icon").addEventListener("click", (event) => {
      toggleFavorite(movie);
      updateFavoriteIcons();
    });

    card.querySelector("img").addEventListener("click", () => {
      window.location.href = `/movie-details.html?imdbid=${movie.imdbID}`;
    });

    movieGrid.appendChild(card);
  });

  updateFavoriteIcons();
}

export function renderFavorites() {
  const container = document.getElementById("cardContainer");
  if (!container || !window.movies) return;

  container.innerHTML = "";
  const favoriteMovies = getFavorites();

  if (favoriteMovies.length === 0) {
    container.innerHTML = "<p>You have no favorited movies.</p>";
    return;
  }

  favoriteMovies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" />
            <h3>${movie.Title}</h3>
            <span class="favorite-icon" data-id="${movie.imdbID}">★</span>
        `;

    card.querySelector(".favorite-icon").addEventListener("click", () => {
      toggleFavorite(movie);
      renderFavorites();
      updateFavoriteIcons();
    });

    container.appendChild(card);
  });
}

async function searchOmdbMovies(query) {
  if (!query) return [];
  const result = await fetch(
    `https://www.omdbapi.com/?s=${query}&apikey=8dbc7797`
  ).then((res) => res.json());
  if (result.Response === "False") return [];
  return result.Search;
}

export function filterMovies(query) {
  if (!window.movies) return;

  if (query === "") {
    renderMovieGrid();
  } else {
    searchOmdbMovies(query).then(renderMovieGrid);
  }
}

export function updateFavoriteIcons() {
  document.querySelectorAll(".favorite-icon").forEach((icon) => {
    const movieId = icon.getAttribute("data-id");
    icon.textContent = getFavoritesIds().includes(movieId) ? "★" : "☆";
  });
}
