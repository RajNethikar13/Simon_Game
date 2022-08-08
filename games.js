

var buttonColors = ["red","blue","green","yellow"]
 var level = 0;
var started = 0;

var gamePattern = [];
var userClickedPattern = [];

addEventListener("keypress",function() {
  if(started < 1){
          $("#level-title").text("Level " + level);
          nextSequence();
          started++;
  }
})

$(".btn").click(function()  {
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);
  }

    }

    else{
      $("#level-title").text("Game Over, Press Any Key to Restart");
      animatePress();
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200)

     startOver();

    }
}



function nextSequence(){

   userClickedPattern = [];

   level++;
   $("#level-title").text("Level " + level);
  var randomNumber = Math.floor( Math.random()*4 );
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);

    $("#" +randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChoosenColor);
    animatePress(randomChoosenColor);
}


function playSound(name){
  var audio = new Audio("sounds/" + name +".mp3" );
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100)

}
function startOver(){
     level = 0;
     started = 0;
     gamePattern = [];
}
