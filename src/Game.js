import { Square } from './Square';
import { Figure, Stick, Block, L, J, T, Z, S } from './Figure';


export class Game {
    constructor(){
        this.canvas = document.getElementById('game');
        this.canvasContainer = document.getElementById('game-contrainer');

        this.width = 10;
        this.height = 20;
        this.ctx = this.canvas.getContext('2d');

        this.keyMapDown = [];

        this.currentFigure = new Z(4,0);
        this.squares = [];
        this.lvl = 1;
        this.tick = 0;
    }

    resize(){
        const scaleOfHeight = window.innerHeight/this.height;
        const scaleOfWidth = window.innerWidth/this.width;
    
        if(scaleOfHeight>scaleOfWidth){
          this.scale = scaleOfWidth;
        } else {
          this.scale = scaleOfHeight;
        }
    
        this.canvas.height = this.scale * this.height;
        this.canvas.width = this.scale * this.width;
    }

    gameUpdate(){
        if(this.tick%10 === 0)this.currentFigure.move(0,1);

        if(this.keyMapDown[83])this.currentFigure.move(0,1);
        else if(this.keyMapDown[68])this.currentFigure.move(1,0);
        else if(this.keyMapDown[65])this.currentFigure.move(-1,0);

        this.tick++;        
    }

    draw(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        
        this.currentFigure.draw(this.scale);
    }
}