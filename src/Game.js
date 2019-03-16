import { Square } from './Square';

export class Game {
    constructor(){
        this.canvas = document.getElementById('game');
        this.canvasContainer = document.getElementById('game-contrainer');

        this.width = 10;
        this.height = 20;
        this.ctx = this.canvas.getContext('2d');
        this.squares = [
            new Square(1,1,'blue'),
            new Square(2,2,'red'),
            new Square(3,3,'green'),
            new Square(8,19,'yellow')
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
        this.squares.forEach(square => {
            square.draw(this.scale);
        });
    }
}