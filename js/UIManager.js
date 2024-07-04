export class UIManager {
  constructor() {
    this.startButton = document.getElementById("start-button");
    this.restartButtons = document.querySelectorAll("#restart-button");
    this.startScreen = document.getElementById("start-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.endScreen = document.getElementById("end-screen");
    this.endText = document.getElementById("end-text");
    this.mistakes = document.getElementById("mistakes");
    this.highscoreDisplay = document.getElementById("highscore");
  }

  init(game) {
    this.startButton.onclick = () => game.startGame();
    this.restartButtons.forEach(
      (button) => (button.onclick = () => game.restartGame())
    );
  }

  showGameScreen() {
    setTimeout(() => {
      this.startScreen.style.display = "none";
      this.gameScreen.style.display = "block";
      this.endScreen.style.display = "none";
    }, 500);
  }

  showEndScreen(mistakeCount) {
    setTimeout(() => {
      this.gameScreen.style.display = "none";
      this.endScreen.style.display = "block";
      const highscore = localStorage.getItem("highscore");
      if (!highscore || mistakeCount < highscore) {
        localStorage.setItem("highscore", mistakeCount);
        this.highscoreDisplay.innerText = `Highscore: ${mistakeCount}`;
      }
      this.endText.innerText =
        highscore == mistakeCount
          ? `Congrats! You had ${mistakeCount} mistakes. That's the least you ever had!!`
          : `Congrats! You had ${mistakeCount} mistakes. The least you ever had is ${highscore}!`;
    }, 1000);
  }

  resetMistakes() {
    this.mistakes.innerText = "Mistakes: 0";
  }

  updateMistakes(count) {
    this.mistakes.innerText = `Mistakes: ${count}`;
  }

  loadHighscore() {
    const highscore = localStorage.getItem("highscore");
    this.highscoreDisplay.innerText = `Highscore: ${highscore}`;
  }
}
