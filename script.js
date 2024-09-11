const carousel = document.querySelector(".carousel"),
  firstItem = carousel.querySelectorAll(".carousel-item")[0],
  arrowIcons = document.querySelectorAll(".wrapper .fa-solid");

let isDragStart = false,
  isDragging = false,
  previewX,
  previewScrollLeft,
  positionDiff;

const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstItemWidth = firstItem.clientWidth + 14;
    carousel.scrollLeft += icon.id == "left" ? -firstItemWidth : firstItemWidth;
    setTimeout(() => showHideIcons(), 250);
  });
});

const dragStart = (e) => {
  isDragStart = true;
  previewX = e.pageX || e.touches[0].pageX;
  previewScrollLeft = carousel.scrollLeft;
  carousel.classList.add("dragging");
  document.body.style.userSelect = "none";
};

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  positionDiff = (e.pageX || e.touches[0].pageX) - previewX;
  carousel.scrollLeft = previewScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
  document.body.style.userSelect = "auto";

  if (!isDragging) return;
  isDragging = false;

  autoSlide();
};

const autoSlide = () => {
  const itemWidth = firstItem.clientWidth + 14;
  const scrollLeft = carousel.scrollLeft;
  const index = Math.round(scrollLeft / itemWidth);
  carousel.scrollLeft = index * itemWidth;
};

const handleMouseUp = () => {
  dragStop();
  document.removeEventListener("mouseup", handleMouseUp);
  document.removeEventListener("mousemove", dragging);
};

showHideIcons();
carousel.addEventListener("scroll", showHideIcons);

carousel.addEventListener("mousedown", (e) => {
  dragStart(e);
  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("mousemove", dragging);
});

carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("touchend", dragStop);

document.addEventListener("mousedown", (e) => {
  if (e.target.closest(".carousel")) {
    dragStart(e);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", dragging);
  }
});

document.addEventListener("touchstart", (e) => {
  if (e.target.closest(".carousel")) {
    dragStart(e);
    document.addEventListener("touchend", dragStop);
    document.addEventListener("touchmove", dragging);
  }
});
