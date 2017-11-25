$("document").ready(function(){
var gameArray = [];
var matchArray = [];
var messedUp = 0;
var strict = 0;

var sound1 = document.createElement('audio');
sound1.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
$.get();
sound1.addEventListener("load", function() {
	sound1.play();
}, true);

var sound2 = document.createElement('audio');
sound2.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
$.get();
sound2.addEventListener("load", function() {
	sound2.play();
}, true);

var sound3 = document.createElement('audio');
sound3.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
$.get();
sound3.addEventListener("load", function() {
	sound3.play();
}, true);

var sound4 = document.createElement('audio');
sound4.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
$.get();
sound4.addEventListener("load", function() {
	sound4.play();
}, true);

var wrongBuzzer = document.createElement('audio');
wrongBuzzer.setAttribute('src', 'https://www.myinstants.com/media/sounds/wrong-buzzer.mp3');
$.get();
wrongBuzzer.addEventListener("load", function() {
	wrongBuzzer.play();
}, true);

$("#start").click(function(){
  gameArray = [];
  matchArray = [];
  messedUp = 0;
  $("#count").html('<p class="text-center">0</p>')
  addOne();
  updateScore();
  ifStrict();

})

$("#one").click(function(){
  matchArray.push(1);
  highlightOn(1);
  sound1.play();
  checkMatch();
  ifStrict();
})
$("#two").click(function(){
  matchArray.push(2);
  highlightOn(2);
  sound2.play();
  checkMatch();
  ifStrict();
})
$("#three").click(function(){
  matchArray.push(3);
  highlightOn(3);
  sound3.play();
  checkMatch();
  ifStrict();
})
$("#four").click(function(){
  matchArray.push(4);
  highlightOn(4);
  sound4.play();
  checkMatch();
  ifStrict();
})
$("#slider-box-container").click(function(){
  if(strict === 1){
    $("#slider-box").animate({right: "110px"},200);
    strict = 0;
  } else {
    $("#slider-box").animate({right: "140px"},200);
    strict = 1;
  }
})

function addOne() {
  gameArray.push(Math.floor(Math.random() * 4 + 1));
  updateScore();
  playArray(0);

}

function playArray(i){
  if(i >= gameArray.length){
    ifStrict()
    return;
  }
  setTimeout(function(){
      highlightOff();
      highlightOn(gameArray[i]);
      playArray(++i);
  },800);

}

var timer = 5

var countDown;

function startTimer(){
  timer--
  console.log(timer);
  if (timer === 0){
    clearInterval(countDown);
    gameOver();
  }
}
function ifStrict(){
  if (strict === 1){
    clearInterval(countDown)
    timer = 5;
    countDown = setInterval(function(){startTimer()},1000);;
  } else {
    return;
  }
}

function highlightOn(btn){
  switch (btn) {
    case 1:
      $("#one").animate({backgroundColor: "#fcd6a9"},500);
      sound1.play();
      $("#one").animate({backgroundColor: "#d33cd8"},500);
      break;
    case 2:
      $("#two").animate({backgroundColor: "#fcd6a9"},500);
      sound2.play();
      $("#two").animate({backgroundColor: "#4286f4"},500);
      break;
    case 3:
      $("#three").animate({backgroundColor: "#fcd6a9"},500);
      sound3.play();
      $("#three").animate({backgroundColor: "#6fd36e"},500);
      break;
    case 4:
      $("#four").animate({backgroundColor: "#fcd6a9"},500);
      sound4.play();
      $("#four").animate({backgroundColor: "#e5755b"},500);
      break;
    default: return "oops"
  }
}

function highlightOff(){
  $("#one").css("background-color","#d33cd8");
  $("#two").css("background-color","#4286f4");
  $("#three").css("background-color","#6fd36e");
  $("#four").css("background-color","#e5755b");
}

function getID(num){
  switch(num){
    case 1:
      num = "one";
      break;
    case 2:
      num = "two";
      break;
    case 3:
      num = "three";
      break;
    case 4:
      num = "four";
      break;
    }
  return num;
}

function checkMatch(){
  console.log(messedUp)
  if (matchArray[matchArray.length-1] === gameArray[matchArray.length-1]){
    if(matchArray.length === gameArray.length){
      addOne();
      matchArray = [];
    }
  } else if (messedUp === 0 && strict === 0){
    matchArray = [];
    $("#start").html('<p class="text-center">Try Again!</p>')
    setTimeout(function(){
      $("#start").html('<p class="text-center">Start</p>')
      playArray(0);
    },2000)
    messedUp++;
  } else {
    gameOver();
  }
}

function updateScore(){
  $("#count").html('<p class="text-center">' + (gameArray.length) + '</p>')
}

function gameOver(){
  $("#start").html('<p class="text-center">Game Over!</p>')
  $("#count").html('<p class="text-center">0</p>')
  setTimeout(function(){
    $("#start").html('<p class="text-center">Start</p>')
  },2000)
  wrongBuzzer.play();
}

function pushToMatch(num){
  matchArray.push(num)
}


})
