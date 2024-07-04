import { UIManager } from "./UIManager.js";
import { CardManager } from "./CardManager.js";
import { SoundManager } from "./SoundManager.js";

export class Game {
  constructor() {
    this.uiManager = new UIManager();
    this.cardManager = new CardManager(this);
    this.soundManager = new SoundManager();
    this.matchingPairs = 0;
    this.totalPairs = 0;
    this.count = 0;
  }

  init() {
    this.uiManager.init(this);
    this.cardManager.init();
    this.totalPairs = this.cardManager.cards.length / 2;
    this.uiManager.loadHighscore();
  }

  startGame() {
    this.uiManager.showGameScreen();
    this.cardManager.shuffleCards();
  }

  restartGame() {
    this.matchingPairs = 0;
    this.count = 0;
    this.uiManager.resetMistakes();
    this.cardManager.resetCards();
    this.uiManager.showGameScreen();
    this.cardManager.shuffleCards();
  }

  incrementMistakes() {
    this.count++;
    this.uiManager.updateMistakes(this.count);
  }

  checkForMatch(firstCard, secondCard) {
    if (firstCard.dataset.img === secondCard.dataset.img) {
      this.cardManager.disableCards(firstCard, secondCard);
      this.matchingPairs++;
      if (this.matchingPairs === this.totalPairs) {
        this.endGame();
      }
    } else {
      this.cardManager.unflipCards(firstCard, secondCard);
      this.incrementMistakes();
    }
  }

  endGame() {
    this.uiManager.showEndScreen(this.count);
  }
}
