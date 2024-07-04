const cards = document.querySelectorAll(".card");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const endText = document.getElementById("end-text");
const mistakes = document.getElementById("mistakes");
const highscoreDisplay = document.getElementById("highscore");

let firstCard;
let secondCard;
let hasFlippedCard = true;
let lockBoard = false;
let totalPairs = cards.length / 2;
let matchingPairs = 0;
let count = 0;

const sounds = {
  lapras: new Audio("sounds/lapras.mp3"),
  litten: new Audio("sounds/litten.mp3"),
  snorlax: new Audio("sounds/snorlax.mp3"),
  aggron: new Audio("sounds/aggron.mp3"),
  alakazam: new Audio("sounds/alakazam.mp3"),
  gastly: new Audio("sounds/gastly.mp3"),
  mr_mime: new Audio("sounds/mr_mime.mp3"),
  pikachu: new Audio("sounds/pikachu.mp3"),
  feraligatr: new Audio("sounds/feraligatr.mp3"),
};

sounds.lapras.volume = 0.5;
sounds.mr_mime.volume = 0.5;
sounds.gastly.volume = 0.5;
sounds.aggron.volume = 0.5;
sounds.feraligatr.volume = 0.5;

function playSound(card) {
  const sound = sounds[card.dataset.img];
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

startButton.onclick = function () {
  startGame();
};

function startGame() {
  setTimeout(function () {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
    shuffle();
  }, 500);
}

restartButton.onclick = function () {
  restartGame();
};

function restartGame() {
  setTimeout(function () {
    resetBoard();
    shuffle();
    endScreen.style.display = "none";
    gameScreen.style.display = "block";
  }, 500);
}
function loadHighscore() {
  const highscore = localStorage.getItem("highscore");
  highscoreDisplay.innerText = `Highscore: ${highscore}`;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.toggle("flip");
  setTimeout(() => {
    playSound(this);
  }, 200);
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;
  }
  doCardsMatch();
}

function doCardsMatch() {
  if (firstCard.dataset.img === secondCard.dataset.img) {
    disableCards();
    matchingPairs++;
    if (matchingPairs === totalPairs) {
      endGame();
    }
  } else {
    unflipCards();
    countMistakes();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
    resetBoard();
  }, 2000);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function shuffle() {
  cards.forEach((element) => {
    let randomPosition = Math.floor(Math.random() * 18);
    element.style.order = randomPosition;
  });
}

function endGame() {
  setTimeout(function () {
    gameScreen.style.display = "none";
    endScreen.style.display = "block";

    const highscore = localStorage.getItem("highscore");
    if (!highscore || count < highscore) {
      localStorage.setItem("highscore", count);
      highscoreDisplay.innerText = `Highscore: ${count}`;
    }
    if (count === parseInt(highscore)) {
      endText.innerText = `Congrats! You had ${count} mistakes. That's the least you ever had!!`;
    } else {
      endText.innerText = `Congrats! You had ${count} mistakes. The least you ever had is ${highscore}!`;
    }
  }, 1000);
}

function countMistakes() {
  if (firstCard.dataset.img !== secondCard.dataset.img) {
    count++;
    mistakes.innerText = `Mistakes: ${count}`;
  }
}

function restartGame() {
  setTimeout(function () {
    matchingPairs = 0;
    count = 0;
    mistakes.innerText = "Mistakes: 0";
    cards.forEach((card) => {
      card.classList.remove("flip");
      card.addEventListener("click", flipCard);
    });
    shuffle();
    endScreen.style.display = "none";
    gameScreen.style.display = "block";
  }, 1000);
}
loadHighscore();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
