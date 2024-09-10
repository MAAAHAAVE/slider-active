const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wrapper .fa-solid");

const scrollLeft = Math.round(carousel.scrollLeft);

let isDragStart = false,
  isDragging = false,
  previewX,
  previewScrollLeft,
  positionDiff;

const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  setTimeout(() => {
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display =
      carousel.scrollLeft == scrollWidth ? "none" : "block";
  }, 50);
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14;
    let imagesToScroll = Math.round(positionDiff / firstImgWidth);
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 250);
  });
});

const autoSlide = () => {
  // if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
  //   return;

  if (carousel.scrollLeft == 0) {
    return (carousel.scrollLeft = 0);
  }
  if (carousel.scrollLeft == carousel.scrollWidth) {
    return (carousel.scrollLeft = carousel.scrollWidth);
  }

  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth; //+14
  let valDifference =
    positionDiff > firstImgWidth
      ? firstImgWidth * imagesToScroll - positionDiff
      : firstImgWidth - positionDiff;

  if (carousel.scrollLeft > previewScrollLeft) {
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  isDragStart = true;
  previewX = e.pageX || e.touches[0].pageX;
  previewScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragStart) return;
  // e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - previewX;
  carousel.scrollLeft = previewScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

showHideIcons();
carousel.addEventListener("scroll", showHideIcons);

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

// function disableSelection(target) {
//   if (typeof target.onselectstart != "undefined")
//     target.onselectstart = function () {
//       return false;
//     };
//   else if (typeof target.style.MozUserSelect != "undefined")
//     target.style.MozUserSelect = "none";
//   else
//     target.onmousedown = function () {
//       return false;
//     };

//   target.style.cursor = "default";
// }
// disableSelection(document.querySelector("img"));
