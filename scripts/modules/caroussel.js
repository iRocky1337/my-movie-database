let currentIndex = 0;
const slidesToShow = 4;

export function setupCarousel(movies) {
  const sliderContainer = document.querySelector(".slider");
  if (!sliderContainer) return;

  function updateCarousel() {
    sliderContainer.innerHTML = "";
    const selectedMovies = movies.slice(
      currentIndex,
      currentIndex + slidesToShow
    );

    selectedMovies.forEach((movie) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");
      slide.innerHTML = `
                <iframe src="${movie.Trailer_link}" allowfullscreen></iframe>
                <h3>${movie.Title}</h3>
            `;
      sliderContainer.appendChild(slide);
    });
  }

  window.moveSlide = (direction) => {
    currentIndex += direction * slidesToShow;
    if (currentIndex < 0) currentIndex = movies.length - slidesToShow;
    if (currentIndex >= movies.length) currentIndex = 0;
    updateCarousel();
  };

  updateCarousel();
}
