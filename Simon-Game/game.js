// Scale button height to dynamic button width depending on screen size
var buttonWidth = $(".btn").width();
$(".btn").css("height", buttonWidth + "px");

// Initialize arrays/variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameRunning = false;

// Wait for keypress from user to start game
$(document).keypress(function() {
  // Start game only if a current game isn't already running
  if (gameRunning === false) {
    nextSequence();
  }
});

// Retrive id of button pressed, play sound, and add to user sequence array
$(".btn").click(function() {
  // If game isn't running, start game, else continue game logic
  if (gameRunning === false) {
    nextSequence();
  } else {
    // Add user clicked color to user's pattern
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    // Play sound/animate button
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // Check answer
    checkAnswer(userClickedPattern.length - 1);
  }
});

function playSound(name) {
  // Play sound associated with input variable name
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  // Animate a button press with CSS class. Add class, delay 100ms, remove class
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  // Set game running flag to active
  gameRunning = true;
  // Generate random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);

  // Choose random color from array and add to game pattern
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Animate button and play sound
  $("#" + randomChosenColour).fadeIn(150).fadeOut(150).fadeIn(150);
  playSound(randomChosenColour);

  // Update h1 with current level
  $("#level-title").text("Level " + level);

  // Increment level
  level++;
}

function checkAnswer(currentLevel) {
  // Checks users input against computer generated pattern

  // If answer correct move to next level, else run game over logic
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If the users pattern is as long as game pattern, that signifies the
    // level is complete so delay 1000ms and go to next level
    if (currentLevel === (gamePattern.length - 1)) {
      setTimeout(function() {
        // Reset user pattern and move to next level
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    gameRunning = false;
    $("#level-title").text("Game Over, Press Any Key to Restart");
    // Animate game over effect.  Apply CSS effect, then remove after 200ms
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    // Play game over sound
    playSound("wrong");
    // Reset variables
    startOver();
  }
}

function startOver() {
  // Reset all the game variables
  gameRunning = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
