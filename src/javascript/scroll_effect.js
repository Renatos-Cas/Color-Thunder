window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  var fadeEffectElement = document.querySelector(".fade-effect");
  if (fadeEffectElement) {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      fadeEffectElement.classList.add("active-fade");
    } else {
      fadeEffectElement.classList.remove("active-fade");
    }
  }
}
