window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;
  const ball = document.querySelector(".ball");
  const gradientBall = document.querySelector(".gradient-ball");
  const targetHeight = 1700;
  const maxScale = Math.max(window.innerWidth, window.innerHeight);

  const scaleFactor = Math.min(scrollPos / targetHeight, 1);
  const newSize = 550 + scaleFactor * maxScale * 2;

  ball.style.width = `${newSize}px`;
  ball.style.height = `${newSize}px`;

  if (scrollPos > 0) {
    gradientBall.style.opacity = "0";
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
    gradientBall.style.opacity = "1";
  }

  const rect = ball.getBoundingClientRect();
  const ballCenterX = rect.left + rect.width / 2;
  const ballCenterY = rect.top + rect.height / 2;

  const angle = Math.atan2(e.clientY - ballCenterY, e.clientX - ballCenterX);

  const offsetX = Math.cos(angle) * (rect.width * 0.4);
  const offsetY = Math.sin(angle) * (rect.height * 0.4);

  gradientBall.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
});

document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".block");

  const checkVisibility = () => {
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;

    blocks.forEach((block) => {
      const blockTop = block.getBoundingClientRect().top + scrollTop;
      const blockHeight = block.offsetHeight;

      if (scrollTop + windowHeight > blockTop + blockHeight / 4) {
        block.classList.add("visible");
      } else {
        block.classList.remove("visible");
      }
    });
  };

  checkVisibility();
  window.addEventListener("scroll", checkVisibility);
});
document.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  const maxScroll = 600;

  const opacityValue = Math.min(scrollPosition / maxScroll, 1);

  const cloneHeader = document.querySelector(".clone-header");
  cloneHeader.style.opacity = opacityValue;
});
document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.querySelector(".sub_title_2");
  const cursorElement = document.createElement("span");
  cursorElement.classList.add("blinking-cursor");
  textElement.after(cursorElement);

  const words = ["выдающимися", "вдохновляющими", "запоминающимися"];
  let wordIndex = 0;
  let letterIndex = 0;
  let currentWord = "";
  let isDeleting = false;
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delayBetweenWords = 2000;

  function type() {
    if (isDeleting) {
      if (letterIndex > 0) {
        letterIndex--;
        textElement.textContent = currentWord.slice(0, letterIndex);
        setTimeout(type, deletingSpeed);
      } else {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        currentWord = words[wordIndex];
        setTimeout(type, typingSpeed);
      }
    } else {
      if (letterIndex < currentWord.length) {
        letterIndex++;
        textElement.textContent = currentWord.slice(0, letterIndex);
        setTimeout(type, typingSpeed);
      } else {
        isDeleting = true;
        setTimeout(type, delayBetweenWords);
      }
    }
    cursorElement.style.display = "inline-block";
  }

  currentWord = words[wordIndex];
  type();
});
