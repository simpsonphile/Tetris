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
            new Square(x,y+1,'#0652DD'),
            new Square(x,y,'#0652DD'),
            new Square(x,y+2,'#0652DD'),
            new Square(x,y+3,'#0652DD')
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
            new Square(x,y,'#FFC312'),
            new Square(x+1,y,'#FFC312'),
            new Square(x,y+1,'#FFC312'),
            new Square(x+1,y+1,'#FFC312') 
        ];
    }
}

export class L extends Figure {
    constructor(x, y, r){
        super(x, y, r);
        this.squares = [
            new Square(x,y,'#FDA7DF'),
            new Square(x+1,y,'#FDA7DF'),
            new Square(x,y-1,'#FDA7DF'),
            new Square(x,y-2,'#FDA7DF') 
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
            new Square(x,y,'#EA2027'),
            new Square(x-1,y,'#EA2027'),
            new Square(x,y-1,'#EA2027'),
            new Square(x,y-2,'#EA2027') 
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
            new Square(x,y,'#C4E538'),
            new Square(x,y-1,'#C4E538'),
            new Square(x+1,y,'#C4E538'),
            new Square(x-1,y,'#C4E538') 
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
            new Square(x,y,'#9980FA'),
            new Square(x+1,y,'#9980FA'),
            new Square(x,y-1,'#9980FA'),
            new Square(x-1,y-1,'#9980FA') 
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
            new Square(x,y,'#B53471'),
            new Square(x-1,y,'#B53471'),
            new Square(x,y-1,'#B53471'),
            new Square(x+1,y-1,'#B53471') 
        ];
    }

    shadowRot(rX, rY){
        this.squares[1].move(1*rY, 1*rX);
        this.squares[2].move(-1*rX, 1*rY);
        this.squares[3].move(-2*rX*(this.r%2?0:1), -2*rX*(this.r%2?1:0)); 
    }
}