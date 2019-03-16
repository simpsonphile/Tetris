export class GameLoop {
  constructor(fps, game){
    this.fps = fps;
    this.then = Date.now();
    this.delta;
    this.now;
    this.interval = 1000/this.fps;
    this.pause = false;

    this.game = game;
  }

  loop(){
    requestAnimationFrame(this.loop.bind(this));
    this.now = Date.now();
    this.delta = this.now - this.then;

    if(this.delta > this.interval){
        this.game.draw();
        this.then = this.now - (this.delta % this.interval);
    }  
  }
}