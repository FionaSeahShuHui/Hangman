// Linking to HTML
const gameWordFE = document.querySelector(".gameWord");
const wordGuessBoxes = document.querySelector(".wordGuess");
const restartGameButton = document.querySelector(".restartGameButton");

// Declaration
let html = "";
let gameWordLetterCount = 0;
let tempGameWord = "";
var correctGuessCount = 0;
var gameProgressCount = 0;
var gameWordGuess = "";
var emptyArray = new Array(30);
var wrongGuessCount = 0;

// Game Sound Effects
let correctGuess = new Audio("audio/CorrectGuess.mp3");
let wrongGuess = new Audio("audio/WrongGuess.mp3");
let gameOver = new Audio("audio/GameOver.mp3");
let gameWin = new Audio("audio/WinGame.mp3");

// Generate a random word
var gameWord =
  wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

// Split gameWord into letters
for (i = 0; i < gameWord.length; i++) {
  html += `<input type="text" disabled class="gameLetter">`;
  gameWordFE.innerHTML = html;
  if (gameWord.charAt(i) == " ") {
    // gameWord is 2 different words
    tempGameWord += " ";
  } else {
    tempGameWord += "-";
    gameWordLetterCount++;
  }
}

// Display gameWord
function dispalyGameWord() {
  document.querySelector(".gameWord").innerHTML = tempGameWord;
  alphabet();
}

// Printing of individual letters in gameWordGuess
function displayCharacter(word, index, character) {
  if (index > word.length - 1) return word;
  return word.substr(0, index) + character + word.substr(index + 1);
}

window.onload = gameWord;

// Keyboard Function
function keyBoardFunction(letter) {
  // Checking if letter exist in gameWord
  for (i = 0; i < gameWord.length; i++) {
    if (gameWord.charAt(i) == letter) {
      correctGuessCount++;
      gameProgressCount++;
      // Correct Guess
      gameWordFE.querySelectorAll("input")[i].value = letter;
      document.getElementById("letter" + letter).style.borderColor = "green";
      correctGuess.play();
    }
  }
  if (correctGuessCount <= 0) {
    // Wrong Guess
    wrongGuessCount++;
    emptyArray = gameWord.indexOf(letter);
    document.getElementById("letter" + letter).style.borderColor = "red";
    document.getElementById("strikes").src =
      "images/" + wrongGuessCount + ".png";
    wrongGuess.play();
  } else {
    correctGuessCount = 0;
  }
  if (wrongGuessCount == 8) {
    // Game Over
    gameOver.play();
    alert("Game over. The word is " + gameWord);
    window.location.reload();
  }
  if (gameProgressCount >= gameWordLetterCount) {
    gameWin.play();
    alert("Congrats. You Win");
    window.location.reload();
  }
}

// Restart Game Functiond
function restartGameButtonFunction() {
  window.location.reload();
}

function alphabet() {
  var htmlAlphabetPart1 = "<div class=letter id=lett";
  var htmlAlphabetPart2 = " onclick=clickMe('";
  var htmlAlphabetPart3 = "')> ";
  var htmlAlphabetPart4 = " </div>";
  var abcd = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var emptString = "";

  for (i = 0; i < abcd.length; i++) {
    var htmlAlphabet =
      htmlAlphabetPart1 +
      i +
      htmlAlphabetPart2 +
      abcd.charAt(i) +
      htmlAlphabetPart3 +
      abcd.charAt(i) +
      htmlAlphabetPart4;
    // console.log(htmlAlphabet);
    emptString = emptString + htmlAlphabet;
    // console.log(ALPHA);
    document.getElementsByClassName("keyBoard").innerHTML = emptString;
    emptyArray[i] = abcd.charAt(i);
  }
}

restartGameButton.addEventListener("click", restartGameButtonFunction);
