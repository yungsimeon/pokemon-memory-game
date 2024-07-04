import { SoundManager } from "./SoundManager.js";

export class CardManager {
  constructor(game) {
    this.game = game;
    this.cards = document.querySelectorAll(".card");
    this.firstCard = null;
    this.secondCard = null;
    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.soundManager = new SoundManager();
  }

  init() {
    this.cards.forEach((card) =>
      card.addEventListener("click", () => this.flipCard(card))
    );
  }

  flipCard(card) {
    if (this.lockBoard || card === this.firstCard) return;

    card.classList.toggle("flip");
    setTimeout(() => this.soundManager.playSound(card), 200);

    if (!this.hasFlippedCard) {
      this.hasFlippedCard = true;
      this.firstCard = card;
    } else {
      this.hasFlippedCard = false;
      this.secondCard = card;
      this.game.checkForMatch(this.firstCard, this.secondCard);
    }
  }

  disableCards() {
    this.firstCard.removeEventListener("click", this.flipCard);
    this.secondCard.removeEventListener("click", this.flipCard);
    this.resetBoard();
  }

  unflipCards() {
    this.lockBoard = true;
    setTimeout(() => {
      this.firstCard.classList.remove("flip");
      this.secondCard.classList.remove("flip");
      this.lockBoard = false;
      this.resetBoard();
    }, 2000);
  }

  resetBoard() {
    [this.hasFlippedCard, this.lockBoard] = [false, false];
    [this.firstCard, this.secondCard] = [null, null];
  }

  shuffleCards() {
    this.cards.forEach((card) => {
      const randomPos = Math.floor(Math.random() * this.cards.length);
      card.style.order = randomPos;
    });
  }

  resetCards() {
    this.cards.forEach((card) => {
      card.classList.remove("flip");
      card.addEventListener("click", () => this.flipCard(card));
    });
  }
}
