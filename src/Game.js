/* eslint-disable import/prefer-default-export */
import {
  Stick, Block, L, J, T, Z, S,
} from './Figure';

export class Game {
  constructor() {
    this.canvas = document.getElementById('game');
    this.canvasContainer = document.getElementById('game-contrainer');

    this.width = 10;
    this.height = 20;
    this.ctx = this.canvas.getContext('2d');

    this.keyMapDown = [];

    this.currentFigure = undefined;
    this.nextFigures = [];
    this.hold = undefined;
    this.holded = false;
    this.squares = [];
    this.lvl = 1;
    this.points = 0;
    this.rows = 0;
    this.rowsToLvl = [0, 10, 20, 35, 50, 70, 90, 120, 150, 175, 200, 250];
    this.combo = 0;
    this.tick = 0;
  }

  init() {
    this.squares = [];
    this.lvl = 1;
    this.points = 0;
    this.rows = 0;
    this.combo = 0;
    this.tick = 0;

    this.nextFigures = [];
    for (let i = 0; i < 5; i += 1) this.addFigureToQue();

    this.hold = undefined;
    this.holded = false;
    this.newFigure();
    this.updateUI();
  }

  resize() {
    const scaleOfHeight = window.innerHeight / this.height;
    const scaleOfWidth = window.innerWidth / this.width;

    if (scaleOfHeight > scaleOfWidth) {
      this.scale = scaleOfWidth;
    } else {
      this.scale = scaleOfHeight;
    }

    this.scale *= 0.95;

    this.canvas.height = this.scale * this.height;
    this.canvas.width = this.scale * this.width;
  }

  updateUI() {
    document.querySelector('.game-panel__points span').innerHTML = this.points;
    document.querySelector('.game-panel__lvl span').innerHTML = this.lvl;
    document.querySelector('.game-panel__combo span').innerHTML = this.combo;
    document.querySelector('.game-panel__rows-left span').innerHTML = this.rowsToLvl[this.lvl] - this.rows;

    for (let i = 0; i < 5; i += 1) {
      const img = `<img src="./img/${this.nextFigures[i].name}.png">`;
      document.querySelector(`.game-left__next-block:nth-child(${i + 1})`).innerHTML = img;
    }

    if (this.hold) {
      const img = `<img src="./img/${this.hold.name}.png">`;
      document.querySelector('.game-left__hold').innerHTML = img;
    }

    if (this.combo > 1) {
      document.querySelector('.game-combo-pop span').innerHTML = ` ${this.combo}`;
      document.querySelector('.game-combo-pop').classList.add('pop', 'u-flex');

      setTimeout(() => {
        document.querySelector('.game-combo-pop').classList.remove('pop');
      }, 500);
    } else {
      document.querySelector('.game-combo-pop').classList.remove('u-flex');
    }
  }

  listenEvents() {
    if (this.keyMapDown[67]) this.holdFigure();

    if (this.keyMapDown[83]) this.currentFigure.move(0, 1, this.squares);

    if (this.keyMapDown[68]) this.currentFigure.move(1, 0, this.squares);
    else if (this.keyMapDown[65]) this.currentFigure.move(-1, 0, this.squares);
  }

  gameOver() {
    this.init();
  }

  addFigureToQue() {
    const rand = Math.floor(Math.random() * 7) + 1;
    if (rand === 1) this.nextFigures.push(new Stick(4, -2));
    else if (rand === 2) this.nextFigures.push(new Block(4, -1));
    else if (rand === 3) this.nextFigures.push(new L(4, 0));
    else if (rand === 4) this.nextFigures.push(new J(4, 0));
    else if (rand === 5) this.nextFigures.push(new T(4, 0));
    else if (rand === 6) this.nextFigures.push(new Z(4, 0));
    else this.nextFigures.push(new S(4, 0));
  }

  newFigure() {
    this.currentFigure = this.nextFigures.shift();
    this.addFigureToQue();
  }

  holdFigure() {
    if (!this.holded) {
      if (this.hold) {
        const temp = this.currentFigure;
        this.currentFigure = this.hold;
        this.hold = temp;
        this.hold.init();
      } else {
        this.hold = this.currentFigure;
        this.hold.init();
        this.newFigure();
      }
    }

    this.updateUI();
    this.holded = true;
  }

  checkIfLost() {
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < this.squares.length; j += 1) {
        if (this.currentFigure.squares[i].x === this.squares[j].x
            && this.currentFigure.squares[i].y === this.squares[j].y) {
          this.gameOver();
        }
      }
    }
  }

  checkIfLvlUp() {
    if (this.rowsToLvl[this.lvl] <= this.rows) {
      this.lvl += 1;
    }
  }

  checkFullRows() {
    let rows = [];
    for (let i = 0; i < this.height; i += 1) {
      if (this.checkFullRow(i))rows.push(i);
    }

    rows = rows.sort((a, b) => { // sort them to start from bottom to top
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    });

    return rows;
  }

  checkFullRow(y) {
    const row = [];

    this.squares.forEach((sqr) => {
      if (sqr.y === y)row.push(sqr);
    });

    if (row.length === 10) {
      return true;
    }

    return false;
  }

  killFullRow(y) {
    for (let i = 0; i < this.squares.length; i += 1) {
      if (this.squares[i].y === y) {
        delete this.squares[i];
        this.squares.splice(i, 1);
        i -= 1;
        continue;
      }
    }
  }

  collapseRow(row) {
    for (let i = row; i >= 0; i -= 1) { // every row higher or equal to deleted row
      this.squares.forEach((sqr) => { // for every square
        if (sqr.y === i) { // that is equal to selected row
          sqr.move(0, 1);// move down
        }
      });
    }
  }

  gravitate() {
    if ((this.tick % (12 - this.lvl)) === 0 && !this.keyMapDown[83]) {
      this.currentFigure.move(0, 1, this.squares);
    }
  }

  addPoints(killedRows, combo) {
    this.points += killedRows * killedRows * 1000 + combo * 1000;
  }

  gameUpdate() {
    this.listenEvents();
    let killedRows = 0;
    this.gravitate();

    if (this.currentFigure.current === false) {
      this.squares = [...this.squares, ...this.currentFigure.squares];// add old figure to squares

      const fullRows = this.checkFullRows();// check if we have full rows
      if (fullRows.length > 0) { // if we have full rows
        fullRows.forEach((row) => { // for every row
          this.killFullRow(row + killedRows);// kill row
          this.collapseRow(row + killedRows);// colapse 1 row down
          killedRows += 1;
        });

        this.addPoints(killedRows, this.combo);
        this.combo += 1;
        this.rows += killedRows;
        this.checkIfLvlUp();
      } else {
        this.combo = 0;
      }

      this.newFigure();
      this.updateUI();
      this.checkIfLost();
      this.holded = false;
    }

    this.tick += 1;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.currentFigure.draw(this.scale);

    this.squares.forEach((sqr) => { sqr.draw(this.scale); });
  }
}
