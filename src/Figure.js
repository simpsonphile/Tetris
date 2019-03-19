import { Square } from './Square';

export class Figure {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.r = 0;
        this.squares = [];
        this.current = true;
    }

    shadowRot(rX, rY){}

    rotate(squares){
        //save squares to back to this state in case rotation fail
        let squaresBefore = [];
        this.squares.forEach(sqr => {
            squaresBefore.push(new Square(sqr.x, sqr.y, sqr.color));
        });
        
        let rX, rY;
        if(this.r == 0){ rX = 1; rY = 1;}
        if(this.r == 1){ rX = -1; rY = 1;}
        if(this.r == 2){ rX = -1; rY = -1;}
        if(this.r == 3){ rX = 1; rY = -1;}

        this.shadowRot(rX, rY);//rotate


        if(this.checkForColision(0, 0, squares)){//check if coliding
            this.squares = [...squaresBefore];//back to state before
        } else {
            this.r++;
            this.r = this.r%4;
        }
    }

    checkForColision(x, y, squares){
        let colided = false;

        this.squares.forEach(figSquare => {
            if(figSquare.checkForColision(x, y, squares)){
                colided = true;
            }
        });

        return colided;
    }

    move(x,y, squares){
        let stopMoving = false;
        if(y>0 && this.checkForColision(x,y, squares)){//if moving down and colided
            stopMoving = true;
        } else if(y>=0 && this.checkForColision(x,y, squares)){//if moving in x dir and colided
            return false;
        }

        if(stopMoving){
            this.current = false;
        } else {
            this.squares.forEach(square => {
                square.move(x,y);
            });
        }

    }

    draw(scale){
        this.squares.forEach(square => {
            square.draw(scale);
        });
    }
}

export class Stick extends Figure {
    constructor(x, y, r){
        super(x, y, r);
        this.squares = [
            new Square(x,y+1,'blue'),
            new Square(x,y,'blue'),
            new Square(x,y+2,'blue'),
            new Square(x,y+3,'blue')
        ];
    }

    shadowRot(rX, rY){
        this.squares[1].move(1*rX, 1*rY);
        this.squares[2].move(-1*rX, -1*rY);
        this.squares[3].move(-2*rX, -2*rY); 
    }
}

export class Block extends Figure {
    constructor(x, y, r){
        super(x, y, r);
        this.squares = [
            new Square(x,y,'yellow'),
            new Square(x+1,y,'yellow'),
            new Square(x,y+1,'yellow'),
            new Square(x+1,y+1,'yellow') 
        ];
    }
}

export class L extends Figure {
    constructor(x, y, r){
        super(x, y, r);
        this.squares = [
            new Square(x,y,'violet'),
            new Square(x+1,y,'violet'),
            new Square(x,y-1,'violet'),
            new Square(x,y-2,'violet') 
        ];
    }

    shadowRot(rX, rY){
        this.squares[1].move(-1*rY, 1*rX);
        this.squares[2].move(1*rX, 1*rY);
        this.squares[3].move(2*rX, 2*rY); 
    }

    
}

export class J extends Figure {
    constructor(x, y, r){
        super(x, y, r);
        this.squares = [
            new Square(x,y,'orangered'),
            new Square(x-1,y,'orangered'),
            new Square(x,y-1,'orangered'),
            new Square(x,y-2,'orangered') 
        ];
    }

    shadowRot(rX, rY){
        this.squares[1].move(1*rY, -1*rX);
        this.squares[2].move(1*rX, 1*rY);
        this.squares[3].move(2*rX, 2*rY); 
    }
}

export class T extends Figure {
    constructor(x, y, r){
        super(x, y, r);
        this.squares = [
            new Square(x,y,'lightgreen'),
            new Square(x,y-1,'lightgreen'),
            new Square(x+1,y,'lightgreen'),
            new Square(x-1,y,'lightgreen') 
        ];
    }

    shadowRot(rX, rY){
        this.squares[1].move(1*rX, 1*rY);
        this.squares[2].move(-1*rY, 1*rX);
        this.squares[3].move(1*rY, -1*rX); 
    }
}

export class Z extends Figure {
    constructor(x, y, r){
        super(x, y, r);
        this.squares = [
            new Square(x,y,'grey'),
            new Square(x+1,y,'grey'),
            new Square(x,y-1,'grey'),
            new Square(x-1,y-1,'grey') 
        ];
    }

    shadowRot(rX, rY){
        this.squares[1].move(-1*rY, -1*rX);
        this.squares[2].move(-1*rX, 1*rY);

        this.squares[3].move(2*rY*(this.r%2?1:0), 2*rY*(this.r%2?0:1)); 
    }
}

export class S extends Figure {
    constructor(x, y, r){
        super(x, y, r);
        this.squares = [
            new Square(x,y,'white'),
            new Square(x-1,y,'white'),
            new Square(x,y-1,'white'),
            new Square(x+1,y-1,'white') 
        ];
    }

    shadowRot(rX, rY){
        this.squares[1].move(1*rY, 1*rX);
        this.squares[2].move(-1*rX, 1*rY);
        this.squares[3].move(-2*rX*(this.r%2?0:1), -2*rX*(this.r%2?1:0)); 
    }
}