window.onscroll = function() {fadeOnApproach()};

function fadeOnApproach() {
  console.log("Scrolling..."); // Test if scrolling triggers the function
  var fadeElements = document.querySelectorAll(".member-info");

  fadeElements.forEach(function(element) {
    var distanceFromTop = element.getBoundingClientRect().top;
    console.log(distanceFromTop);
    var headerHeight = 80;

    if (distanceFromTop < headerHeight + 100) {
      var opacity = (distanceFromTop - headerHeight) / 100;
      opacity = opacity < 0 ? 0 : opacity;
      element.style.opacity = opacity;
    } else {
      element.style.opacity = 1;
    }
  });
}
