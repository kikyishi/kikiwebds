// Wait for the DOM to exist
document.addEventListener("DOMContentLoaded", () => {
  // Initial fake progress
  gsap.to("#loading-bar", {
    width: "60%",
    duration: 3,
    ease: "power1.out",
  });

  // When everything (images, etc.) is actually loaded
  window.addEventListener("load", () => {
    const tl = gsap.timeline();

    tl.to("#loading-bar", {
      width: "100%",
      duration: 0.4,
    })
      .to("#loader-wrapper", {
        opacity: 0,
        duration: 0.3,
      })
      .set("#loader-wrapper", { display: "none" });
  });
});

const cursor = document.querySelector(".cursorcircle");

// Only run the script if the element is found
if (cursor) {
  let mouseX = 0,
    mouseY = 0;
  let ballX = 0,
    ballY = 0;
  const speed = 0.1;
  const padding = 150;

  document.addEventListener("mousemove", (e) => {
    // Clamping the mouse coordinates within your padding
    mouseX = Math.max(
      padding,
      Math.min(e.clientX, window.innerWidth - padding),
    );
    mouseY = Math.max(
      padding,
      Math.min(e.clientY, window.innerHeight - padding),
    );
  });

  function animate() {
    let distX = mouseX - ballX;
    let distY = mouseY - ballY;

    ballX += distX * speed;
    ballY += distY * speed;

    // Using translate3d for better hardware acceleration/performance
    cursor.style.transform = `translate3d(calc(${ballX}px - 50%), calc(${ballY}px - 50%), 0)`;

    requestAnimationFrame(animate);
  }

  animate();
}

const app = document.getElementById("app");
let currentY = 0;

window.addEventListener(
  "wheel",
  (e) => {
    const isAtTop = window.scrollY === 0;
    const isAtBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
      // 1. Dampen the movement (e.deltaY * 0.2 makes it feel heavy)
      currentY -= e.deltaY * 0.2;

      // 2. Cap the stretch so it doesn't go too far (e.g., 70px)
      currentY = Math.max(Math.min(currentY, 70), -70);

      // 3. Move the app container smoothly
      gsap.to(app, {
        y: currentY,
        duration: 0.1,
        ease: "power1.out",
        onComplete: () => {
          // 4. Snap back with high damping (the "rubbery" secret)
          gsap.to(app, {
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.6)", // Increased period (0.6) makes it less "vibey"
            onStart: () => {
              currentY = 0;
            },
          });
        },
      });
    }
  },
  { passive: true },
);

//

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
