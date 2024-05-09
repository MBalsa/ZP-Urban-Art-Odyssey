// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
};
slider();

//IMG GRID

const column1 = document.getElementById("column1");
const column2 = document.getElementById("column2");
const column3 = document.getElementById("column3");

const addImgs = () => {
  fetch("source/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const columns = [column1, column2, column3];

      data.images.forEach((image, index) => {
        const img = document.createElement("img");
        img.src = image.image;
        img.alt = image.name;
        img.style.width = "100%";

        const columnIndex = index % columns.length;
        columns[columnIndex].appendChild(img);
      });
    });
};

addImgs();
