window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;
  const ball = document.querySelector(".ball");
  const targetHeight = 1600;
  const maxScale = Math.max(window.innerWidth, window.innerHeight);

  const scaleFactor = Math.min(scrollPos / targetHeight, 1);
  const newSize = 550 + scaleFactor * maxScale * 2;

  ball.style.width = `${newSize}px`;
  ball.style.height = `${newSize}px`;
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
