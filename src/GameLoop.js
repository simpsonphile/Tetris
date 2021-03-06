/* eslint-disable import/prefer-default-export */
export class GameLoop {
  constructor(fps, game) {
    this.fps = fps;
    this.then = Date.now();
    this.then2 = Date.now();
    this.delta = undefined;
    this.delta2 = undefined;
    this.now = undefined;
    this.interval = 1000 / this.fps;
    this.pause = false;
    this.game = game;
  }

  pauseGame(state) {
    this.pause = state;

    if (state) {
      document.querySelector('.js-pause').classList.add('is-active');
    } else {
      document.querySelector('.js-pause').classList.remove('is-active');
    }
  }

  gameLoop() {
    requestAnimationFrame(this.gameLoop.bind(this));
    this.now = Date.now();
    this.delta = this.now - this.then;

    if (this.delta > this.interval && !this.pause) {
      this.game.draw();
      this.then = this.now - (this.delta % this.interval);
    }
  }

  gameLogicLoop() {
    requestAnimationFrame(this.gameLogicLoop.bind(this));
    this.now = Date.now();
    this.delta2 = this.now - this.then2;

    if (this.delta2 > 100 && !this.pause) {
      this.game.gameUpdate();
      this.then2 = this.now - (this.delta2 % 100);
    }
  }
}
