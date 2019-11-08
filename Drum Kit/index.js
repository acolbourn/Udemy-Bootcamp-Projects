function playDrum(letter) {
  // Check passed in string and play associated sound
  switch (letter) {
    case "w":
      var tom1 = new Audio('sounds/tom-1.mp3');
      tom1.play();
      break;
    case "a":
      var tom2 = new Audio('sounds/tom-2.mp3');
      tom2.play();
      break;
    case "s":
      var tom3 = new Audio('sounds/tom-3.mp3');
      tom3.play();
      break;
    case "d":
      var tom4 = new Audio('sounds/tom-4.mp3');
      tom4.play();
      break;
    case "j":
      var kick = new Audio('sounds/kick-bass.mp3');
      kick.play();
      break;
    case "k":
      var snare = new Audio('sounds/snare.mp3');
      snare.play();
      break;
    case "l":
      var crash = new Audio('sounds/crash.mp3');
      crash.play();
      break;
    default:
      console.log(letter);
  }
}

// Loop through each drum button and add mouse click event listener
for (i = 0; i < document.querySelectorAll(".drum").length; i++) {
  document.querySelectorAll("button")[i].addEventListener("click", function() {
    playDrum(this.innerHTML);
    buttonAnimation(this.innerHTML);
  });
}

// Create keyboard listener and trigger samples if drum key pressed
document.addEventListener("keydown", function(event) {
  playDrum(event.key);
  buttonAnimation(event.key);
});

// Button Animation to change button's CSS when activated
function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  // Add pressed button CSS class
  activeButton.classList.add("pressed");
  // Delay 100 ms for animation effect and then remove pressed CSS class
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}
