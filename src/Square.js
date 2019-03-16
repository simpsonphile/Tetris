export class Square {
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;

        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
    }

    move(aX, aY){
        this.x += aX;
        this.y += aY;
    }

    update(newX, newY){
        this.x = newX;
        this.y = newY;
    }

    draw(scale){
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x * scale, this.y * scale, 1*scale, 1*scale);
    }
}