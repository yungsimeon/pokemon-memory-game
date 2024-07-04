export class SoundManager {
  constructor() {
    this.sounds = {
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

    this.setVolume();
  }

  setVolume() {
    this.sounds.lapras.volume = 0.5;
    this.sounds.mr_mime.volume = 0.5;
    this.sounds.gastly.volume = 0.5;
    this.sounds.aggron.volume = 0.5;
    this.sounds.feraligatr.volume = 0.5;
  }

  playSound(card) {
    const sound = this.sounds[card.dataset.img];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }
}
