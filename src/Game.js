import { Square } from './Square';
import { Figure, Stick, Block, L, J, T, Z, S } from './Figure';

export class Game {
    constructor(){
        this.canvas = document.getElementById('game');
        this.canvasContainer = document.getElementById('game-contrainer');

        this.width = 10;
        this.height = 20;
        this.ctx = this.canvas.getContext('2d');

        this.figures = [

            new Z(5,17)

        ];
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

    }

    draw(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.figures.forEach(fig => {fig.draw(this.scale)});
        this.figures.forEach(fig => {fig.rotate(1)});
    }
}