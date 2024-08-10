window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;
  const ball = document.querySelector(".ball");
  const gradientBall = document.querySelector(".gradient-ball");
  const targetHeight = 1600;
  const maxScale = Math.max(window.innerWidth, window.innerHeight);

  const scaleFactor = Math.min(scrollPos / targetHeight, 1);
  const newSize = 550 + scaleFactor * maxScale * 2;

  ball.style.width = `${newSize}px`;
  ball.style.height = `${newSize}px`;

  if (scrollPos > 0) {
    gradientBall.style.opacity = "0"; // Градиентный шар становится невидимым
  }

  if (scaleFactor >= 1) {
    ball.style.position = "absolute";
    ball.style.top = "0";
    ball.style.left = "0";
    ball.style.width = "100vw";
    ball.style.height = "100vh";
    ball.style.transform = "none";
    ball.style.zIndex = "-1";
  }
});

document.addEventListener("mousemove", (e) => {
  const ball = document.querySelector(".ball");
  const gradientBall = document.querySelector(".gradient-ball");

  if (window.scrollY === 0) {
    gradientBall.style.opacity = "1"; // Градиентный шар снова виден при возвращении наверх
  }

  const rect = ball.getBoundingClientRect();
  const ballCenterX = rect.left + rect.width / 2;
  const ballCenterY = rect.top + rect.height / 2;

  const angle = Math.atan2(e.clientY - ballCenterY, e.clientX - ballCenterX);

  const offsetX = Math.cos(angle) * (rect.width * 0.4);
  const offsetY = Math.sin(angle) * (rect.height * 0.4);

  gradientBall.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
});
