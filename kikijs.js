const track = document.getElementById("track");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let index = 0;
let startX = 0;
let autoPlay = setInterval(moveNext, 4000);

function updateSlide() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

function moveNext() {
  index = (index + 1) % slides.length;
  updateSlide();
}

function movePrev() {
  index = (index - 1 + slides.length) % slides.length;
  updateSlide();
}

nextBtn.addEventListener("click", () => {
  moveNext();
  resetTimer();
});

prevBtn.addEventListener("click", () => {
  movePrev();
  resetTimer();
});

track.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
track.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) moveNext();
  else if (endX - startX > 50) movePrev();
  resetTimer();
});

function resetTimer() {
  clearInterval(autoPlay);
  autoPlay = setInterval(moveNext, 4000);
}
