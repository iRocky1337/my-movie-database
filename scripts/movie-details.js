import { fetchMovies } from "./modules/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const imdbID = params.get("imdbid");
  if (!imdbID) return;

  const movies = await fetchMovies();
  const movie = movies.find((m) => m.imdbID === imdbID);
  if (!movie) return;

  document.getElementById("detailPoster").src =
    movie.Poster || "./res/placeholder.jpg";

  document.getElementById("detailTitle").textContent =
    movie.Title || "No Title Found";

  document.getElementById("ratingGenre").textContent =
    (movie.Rated ? `Rated: ${movie.Rated}` : "") +
      (movie.Genre ? ` | Genre: ${movie.Genre}` : "") ||
    "Rated: N/A | Genre: N/A";

  document.getElementById("releaseRuntime").textContent =
    (movie.Released ? `Released: ${movie.Released}` : "") +
      (movie.Runtime ? ` | Runtime: ${movie.Runtime}` : "") ||
    "Released: N/A | Runtime: N/A";

  document.getElementById("detailPlot").textContent =
    movie.Plot && movie.Plot.trim()
      ? movie.Plot
      : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet sem nec libero scelerisque feugiat in quis nisl, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet sem nec libero scelerisque feugiat in quis nisl,Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet sem .";

  document.getElementById("detailDirector").textContent =
    movie.Director && movie.Director.trim()
      ? movie.Director
      : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

  document.getElementById("detailWriter").textContent =
    movie.Writer && movie.Writer.trim()
      ? movie.Writer
      : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

  document.getElementById("detailActors").textContent =
    movie.Actors && movie.Actors.trim()
      ? movie.Actors
      : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
});
