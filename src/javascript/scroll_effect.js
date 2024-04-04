window.addEventListener('scroll', fadeFunction);

function fadeFunction() {
  let fadeEffectElement = document.querySelector(".fade-effect");
  let scrollPosition = window.scrollY;
  let opacity = 1 - Math.min(1, scrollPosition / 100);
  fadeEffectElement.style.background = `linear-gradient(to top, rgba(5, 68, 94, ${opacity}), rgba(5, 68, 94, 1))`;
}
