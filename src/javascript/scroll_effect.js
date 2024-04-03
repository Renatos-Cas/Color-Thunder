window.onscroll = function() { fadeFunction(); };

function fadeFunction() {
  var fadeEffectElement = document.querySelector(".fade-effect");
  if (fadeEffectElement) {
    var scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
    var opacity = 1 - Math.min(1, scrollPosition / 100);
    fadeEffectElement.style.background = `linear-gradient(to top, rgba(5, 68, 94, ${opacity}), rgba(5, 68, 94, 100))`;
  }
}
