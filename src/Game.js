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

        this.currentFigure;
        this.squares = [];
        this.lvl = 1;
        this.points = 0;
        this.tick = 0;
    }

    init(){
        this.squares = [];
        this.lvl = 1;
        this.points = 0;
        this. tick = 0;
        this.newFigure();
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

    newFigure(){
        let rand = Math.floor(Math.random()*7)+1;
        if(rand === 1)this.currentFigure = new Stick(4,0);
        else if(rand === 2)this.currentFigure = new Block(4,0);
        else if(rand === 3)this.currentFigure = new L(4,0);
        else if(rand === 4)this.currentFigure = new J(4,0);
        else if(rand === 5)this.currentFigure = new T(4,0);
        else if(rand === 6)this.currentFigure = new Z(4,0);
        else this.currentFigure = new S(4,0);

        this.checkIfLost();
    }

    checkIfLost(){
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < this.squares.length; j++){
                if(this.currentFigure.squares[i].x === this.squares[j].x && this.currentFigure.squares[i].y === this.squares[j].y){
                    this.gameOver();
                }
            }
        }
    }

    gameOver(){
        this.init();
    }

    gameUpdate(){
        if(this.tick%10 === 0)this.currentFigure.move(0,1, this.squares);

        if(this.currentFigure.current === false){
            this.squares = [...this.squares, ...this.currentFigure.squares];
            this.newFigure();
        }

        if(this.keyMapDown[83])this.currentFigure.move(0,1, this.squares);
        else if(this.keyMapDown[68])this.currentFigure.move(1,0, this.squares);
        else if(this.keyMapDown[65])this.currentFigure.move(-1,0, this.squares);

        this.tick++;        
    }

    draw(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.currentFigure.draw(this.scale);

        this.squares.forEach(sqr => {sqr.draw(this.scale);})
    }
}