const API_URL = "https://santosnr6.github.io/Data/favoritemovies.json";

export async function fetchMovies() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch movies.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}
