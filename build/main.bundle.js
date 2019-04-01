/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _GameLoop = __webpack_require__(1);

var _Game = __webpack_require__(2);

var game = new _Game.Game();
var gameLoop = new _GameLoop.GameLoop(30, game);

game.init();
gameLoop.gameLoop();
gameLoop.gameLogicLoop();

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', game.resize.bind(game));
document.addEventListener('resize', game.resize.bind(game));
document.addEventListener('orientationchange', game.resize.bind(game));

document.addEventListener('keydown', function (e) {
  if (e.keyCode === 32 && !gameLoop.pause && !game.keyMapDown[32]) {
    game.currentFigure.rotate(game.squares);
  }

  if (e.keyCode === 80 && !game.keyMapDown[80]) {
    if (gameLoop.pause) {
      gameLoop.pauseGame(false);
    } else {
      gameLoop.pauseGame(true);
    }
  }

  if (e.keyCode === 82 && !game.keyMapDown[82]) {
    gameLoop.pauseGame(false);
    game.init();
  }

  game.keyMapDown[e.keyCode] = true;
});

document.addEventListener('keyup', function (e) {
  game.keyMapDown[e.keyCode] = false;
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable import/prefer-default-export */
var GameLoop = exports.GameLoop = function () {
  function GameLoop(fps, game) {
    _classCallCheck(this, GameLoop);

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

  _createClass(GameLoop, [{
    key: 'pauseGame',
    value: function pauseGame(state) {
      this.pause = state;

      if (state) {
        document.querySelector('.game-pause').classList.add('u-flex');
      } else {
        document.querySelector('.game-pause').classList.remove('u-flex');
      }
    }
  }, {
    key: 'gameLoop',
    value: function gameLoop() {
      requestAnimationFrame(this.gameLoop.bind(this));
      this.now = Date.now();
      this.delta = this.now - this.then;

      if (this.delta > this.interval && !this.pause) {
        this.game.draw();
        this.then = this.now - this.delta % this.interval;
      }
    }
  }, {
    key: 'gameLogicLoop',
    value: function gameLogicLoop() {
      requestAnimationFrame(this.gameLogicLoop.bind(this));
      this.now = Date.now();
      this.delta2 = this.now - this.then2;

      if (this.delta2 > 100 && !this.pause) {
        this.game.gameUpdate();
        this.then2 = this.now - this.delta2 % 100;
      }
    }
  }]);

  return GameLoop;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable import/prefer-default-export */


var _Figure = __webpack_require__(3);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
  function Game() {
    _classCallCheck(this, Game);

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

  _createClass(Game, [{
    key: 'init',
    value: function init() {
      this.squares = [];
      this.lvl = 1;
      this.points = 0;
      this.rows = 0;
      this.combo = 0;
      this.tick = 0;

      this.nextFigures = [];
      for (var i = 0; i < 5; i += 1) {
        this.addFigureToQue();
      }this.hold = undefined;
      this.holded = false;
      this.newFigure();
      this.updateUI();
    }
  }, {
    key: 'resize',
    value: function resize() {
      var scaleOfHeight = window.innerHeight / this.height;
      var scaleOfWidth = window.innerWidth / this.width;

      if (scaleOfHeight > scaleOfWidth) {
        this.scale = scaleOfWidth;
      } else {
        this.scale = scaleOfHeight;
      }

      this.scale *= 0.95;

      this.canvas.height = this.scale * this.height;
      this.canvas.width = this.scale * this.width;
    }
  }, {
    key: 'updateUI',
    value: function updateUI() {
      document.querySelector('.game-panel__points span').innerHTML = this.points;
      document.querySelector('.game-panel__lvl span').innerHTML = this.lvl;
      document.querySelector('.game-panel__combo span').innerHTML = this.combo;
      document.querySelector('.game-panel__rows-left span').innerHTML = this.rowsToLvl[this.lvl] - this.rows;

      for (var i = 0; i < 5; i += 1) {
        var img = '<img src="./img/' + this.nextFigures[i].name + '.png">';
        document.querySelector('.game-left__next-block:nth-child(' + (i + 1) + ')').innerHTML = img;
      }

      if (this.hold) {
        var _img = '<img src="./img/' + this.hold.name + '.png">';
        document.querySelector('.game-left__hold').innerHTML = _img;
      }

      if (this.combo > 1) {
        document.querySelector('.game-combo-pop span').innerHTML = ' ' + this.combo;
        document.querySelector('.game-combo-pop').classList.add('pop', 'u-flex');

        setTimeout(function () {
          document.querySelector('.game-combo-pop').classList.remove('pop');
        }, 500);
      } else {
        document.querySelector('.game-combo-pop').classList.remove('u-flex');
      }
    }
  }, {
    key: 'listenEvents',
    value: function listenEvents() {
      if (this.keyMapDown[67]) this.holdFigure();

      if (this.keyMapDown[83]) this.currentFigure.move(0, 1, this.squares);

      if (this.keyMapDown[68]) this.currentFigure.move(1, 0, this.squares);else if (this.keyMapDown[65]) this.currentFigure.move(-1, 0, this.squares);
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      this.init();
    }
  }, {
    key: 'addFigureToQue',
    value: function addFigureToQue() {
      var rand = Math.floor(Math.random() * 7) + 1;
      if (rand === 1) this.nextFigures.push(new _Figure.Stick(4, -2));else if (rand === 2) this.nextFigures.push(new _Figure.Block(4, -1));else if (rand === 3) this.nextFigures.push(new _Figure.L(4, 0));else if (rand === 4) this.nextFigures.push(new _Figure.J(4, 0));else if (rand === 5) this.nextFigures.push(new _Figure.T(4, 0));else if (rand === 6) this.nextFigures.push(new _Figure.Z(4, 0));else this.nextFigures.push(new _Figure.S(4, 0));
    }
  }, {
    key: 'newFigure',
    value: function newFigure() {
      this.currentFigure = this.nextFigures.shift();
      this.addFigureToQue();
    }
  }, {
    key: 'holdFigure',
    value: function holdFigure() {
      if (!this.holded) {
        if (this.hold) {
          var temp = this.currentFigure;
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
  }, {
    key: 'checkIfLost',
    value: function checkIfLost() {
      for (var i = 0; i < 4; i += 1) {
        for (var j = 0; j < this.squares.length; j += 1) {
          if (this.currentFigure.squares[i].x === this.squares[j].x && this.currentFigure.squares[i].y === this.squares[j].y) {
            this.gameOver();
          }
        }
      }
    }
  }, {
    key: 'checkIfLvlUp',
    value: function checkIfLvlUp() {
      if (this.rowsToLvl[this.lvl] <= this.rows) {
        this.lvl += 1;
      }
    }
  }, {
    key: 'checkFullRows',
    value: function checkFullRows() {
      var rows = [];
      for (var i = 0; i < this.height; i += 1) {
        if (this.checkFullRow(i)) rows.push(i);
      }

      rows = rows.sort(function (a, b) {
        // sort them to start from bottom to top
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      });

      return rows;
    }
  }, {
    key: 'checkFullRow',
    value: function checkFullRow(y) {
      var row = [];

      this.squares.forEach(function (sqr) {
        if (sqr.y === y) row.push(sqr);
      });

      if (row.length === 10) {
        return true;
      }

      return false;
    }
  }, {
    key: 'killFullRow',
    value: function killFullRow(y) {
      for (var i = 0; i < this.squares.length; i += 1) {
        if (this.squares[i].y === y) {
          delete this.squares[i];
          this.squares.splice(i, 1);
          i -= 1;
          continue;
        }
      }
    }
  }, {
    key: 'collapseRow',
    value: function collapseRow(row) {
      var _this = this;

      var _loop = function _loop(i) {
        // every row higher or equal to deleted row
        _this.squares.forEach(function (sqr) {
          // for every square
          if (sqr.y === i) {
            // that is equal to selected row
            sqr.move(0, 1); // move down
          }
        });
      };

      for (var i = row; i >= 0; i -= 1) {
        _loop(i);
      }
    }
  }, {
    key: 'gravitate',
    value: function gravitate() {
      if (this.tick % (12 - this.lvl) === 0 && !this.keyMapDown[83]) {
        this.currentFigure.move(0, 1, this.squares);
      }
    }
  }, {
    key: 'addPoints',
    value: function addPoints(killedRows, combo) {
      this.points += killedRows * killedRows * 1000 + combo * 1000;
    }
  }, {
    key: 'gameUpdate',
    value: function gameUpdate() {
      var _this2 = this;

      this.listenEvents();
      var killedRows = 0;
      this.gravitate();

      if (this.currentFigure.current === false) {
        this.squares = [].concat(_toConsumableArray(this.squares), _toConsumableArray(this.currentFigure.squares)); // add old figure to squares

        var fullRows = this.checkFullRows(); // check if we have full rows
        if (fullRows.length > 0) {
          // if we have full rows
          fullRows.forEach(function (row) {
            // for every row
            _this2.killFullRow(row + killedRows); // kill row
            _this2.collapseRow(row + killedRows); // colapse 1 row down
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
  }, {
    key: 'draw',
    value: function draw() {
      var _this3 = this;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.currentFigure.draw(this.scale);

      this.squares.forEach(function (sqr) {
        sqr.draw(_this3.scale);
      });
    }
  }]);

  return Game;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.S = exports.Z = exports.T = exports.J = exports.L = exports.Block = exports.Stick = exports.Figure = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Square = __webpack_require__(4);

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Figure = exports.Figure = function () {
  function Figure(x, y) {
    _classCallCheck(this, Figure);

    this.x = x;
    this.sX = x;
    this.y = y;
    this.sY = y;
    this.r = 0;
    this.squares = [];
    this.current = true;
  }

  _createClass(Figure, [{
    key: 'shadowRot',
    value: function shadowRot() {}
  }, {
    key: 'rotate',
    value: function rotate(squares) {
      //  save squares to back to this state in case rotation fail
      var squaresBefore = [];
      this.squares.forEach(function (sqr) {
        squaresBefore.push(new _Square.Square(sqr.x, sqr.y, sqr.color));
      });
      var rX = void 0;
      var rY = void 0;
      if (this.r === 0) {
        rX = 1;rY = 1;
      }
      if (this.r === 1) {
        rX = -1;rY = 1;
      }
      if (this.r === 2) {
        rX = -1;rY = -1;
      }
      if (this.r === 3) {
        rX = 1;rY = -1;
      }

      this.shadowRot(rX, rY);

      if (this.checkForColision(0, 0, squares)) {
        //    check if coliding
        this.squares = [].concat(squaresBefore);
        //    back to state before
      } else {
        this.r += 1;
        this.r = this.r % 4;
      }
    }
  }, {
    key: 'checkForColision',
    value: function checkForColision(x, y, squares) {
      var colided = false;
      this.squares.forEach(function (figSquare) {
        if (figSquare.checkForColision(x, y, squares)) {
          colided = true;
        }
      });
      return colided;
    }
  }, {
    key: 'move',
    value: function move(x, y, squares) {
      var stopMoving = false;
      if (y > 0 && this.checkForColision(x, y, squares)) {
        stopMoving = true;
      } else if (y >= 0 && this.checkForColision(x, y, squares)) {
        return false;
      }

      if (stopMoving) {
        this.current = false;
      } else {
        this.squares.forEach(function (square) {
          square.move(x, y);
        });
      }
      return true;
    }
  }, {
    key: 'draw',
    value: function draw(scale) {
      this.squares.forEach(function (square) {
        square.draw(scale);
      });
    }
  }]);

  return Figure;
}();

var Stick = exports.Stick = function (_Figure) {
  _inherits(Stick, _Figure);

  function Stick(x, y, r) {
    _classCallCheck(this, Stick);

    var _this = _possibleConstructorReturn(this, (Stick.__proto__ || Object.getPrototypeOf(Stick)).call(this, x, y, r));

    _this.name = 'Stick';
    _this.init();
    return _this;
  }

  _createClass(Stick, [{
    key: 'init',
    value: function init() {
      var x = this.sX;
      this.x = this.sX;
      var y = this.sY;
      this.y = this.sY;
      this.r = 0;
      this.squares = [new _Square.Square(x, y + 1, '#0652DD'), new _Square.Square(x, y, '#0652DD'), new _Square.Square(x, y + 2, '#0652DD'), new _Square.Square(x, y + 3, '#0652DD')];
    }
  }, {
    key: 'shadowRot',
    value: function shadowRot(rX, rY) {
      this.squares[1].move(1 * rX, 1 * rY);
      this.squares[2].move(-1 * rX, -1 * rY);
      this.squares[3].move(-2 * rX, -2 * rY);
    }
  }]);

  return Stick;
}(Figure);

var Block = exports.Block = function (_Figure2) {
  _inherits(Block, _Figure2);

  function Block(x, y, r) {
    _classCallCheck(this, Block);

    var _this2 = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, x, y, r));

    _this2.name = 'Block';
    _this2.init();
    return _this2;
  }

  _createClass(Block, [{
    key: 'init',
    value: function init() {
      var x = this.sX;
      this.x = this.sX;
      var y = this.sY;
      this.y = this.sY;
      this.r = 0;
      this.squares = [new _Square.Square(x, y, '#FFC312'), new _Square.Square(x + 1, y, '#FFC312'), new _Square.Square(x, y + 1, '#FFC312'), new _Square.Square(x + 1, y + 1, '#FFC312')];
    }
  }]);

  return Block;
}(Figure);

var L = exports.L = function (_Figure3) {
  _inherits(L, _Figure3);

  function L(x, y, r) {
    _classCallCheck(this, L);

    var _this3 = _possibleConstructorReturn(this, (L.__proto__ || Object.getPrototypeOf(L)).call(this, x, y, r));

    _this3.name = 'L';
    _this3.init();
    return _this3;
  }

  _createClass(L, [{
    key: 'init',
    value: function init() {
      var x = this.sX;
      this.x = this.sX;
      var y = this.sY;
      this.y = this.sY;
      this.r = 0;
      this.squares = [new _Square.Square(x, y, '#FDA7DF'), new _Square.Square(x + 1, y, '#FDA7DF'), new _Square.Square(x, y - 1, '#FDA7DF'), new _Square.Square(x, y - 2, '#FDA7DF')];
    }
  }, {
    key: 'shadowRot',
    value: function shadowRot(rX, rY) {
      this.squares[1].move(-1 * rY, 1 * rX);
      this.squares[2].move(1 * rX, 1 * rY);
      this.squares[3].move(2 * rX, 2 * rY);
    }
  }]);

  return L;
}(Figure);

var J = exports.J = function (_Figure4) {
  _inherits(J, _Figure4);

  function J(x, y, r) {
    _classCallCheck(this, J);

    var _this4 = _possibleConstructorReturn(this, (J.__proto__ || Object.getPrototypeOf(J)).call(this, x, y, r));

    _this4.name = 'J';
    _this4.init();
    return _this4;
  }

  _createClass(J, [{
    key: 'init',
    value: function init() {
      var x = this.sX;
      this.x = this.sX;
      var y = this.sY;
      this.y = this.sY;
      this.r = 0;
      this.squares = [new _Square.Square(x, y, '#EA2027'), new _Square.Square(x - 1, y, '#EA2027'), new _Square.Square(x, y - 1, '#EA2027'), new _Square.Square(x, y - 2, '#EA2027')];
    }
  }, {
    key: 'shadowRot',
    value: function shadowRot(rX, rY) {
      this.squares[1].move(1 * rY, -1 * rX);
      this.squares[2].move(1 * rX, 1 * rY);
      this.squares[3].move(2 * rX, 2 * rY);
    }
  }]);

  return J;
}(Figure);

var T = exports.T = function (_Figure5) {
  _inherits(T, _Figure5);

  function T(x, y, r) {
    _classCallCheck(this, T);

    var _this5 = _possibleConstructorReturn(this, (T.__proto__ || Object.getPrototypeOf(T)).call(this, x, y, r));

    _this5.name = 'T';
    _this5.init();
    return _this5;
  }

  _createClass(T, [{
    key: 'init',
    value: function init() {
      var x = this.sX;
      this.x = this.sX;
      var y = this.sY;
      this.y = this.sY;
      this.r = 0;
      this.squares = [new _Square.Square(x, y, '#C4E538'), new _Square.Square(x, y - 1, '#C4E538'), new _Square.Square(x + 1, y, '#C4E538'), new _Square.Square(x - 1, y, '#C4E538')];
    }
  }, {
    key: 'shadowRot',
    value: function shadowRot(rX, rY) {
      this.squares[1].move(1 * rX, 1 * rY);
      this.squares[2].move(-1 * rY, 1 * rX);
      this.squares[3].move(1 * rY, -1 * rX);
    }
  }]);

  return T;
}(Figure);

var Z = exports.Z = function (_Figure6) {
  _inherits(Z, _Figure6);

  function Z(x, y, r) {
    _classCallCheck(this, Z);

    var _this6 = _possibleConstructorReturn(this, (Z.__proto__ || Object.getPrototypeOf(Z)).call(this, x, y, r));

    _this6.name = 'Z';
    _this6.init();
    return _this6;
  }

  _createClass(Z, [{
    key: 'init',
    value: function init() {
      var x = this.sX;
      this.x = this.sX;
      var y = this.sY;
      this.y = this.sY;
      this.r = 0;
      this.squares = [new _Square.Square(x, y, '#9980FA'), new _Square.Square(x + 1, y, '#9980FA'), new _Square.Square(x, y - 1, '#9980FA'), new _Square.Square(x - 1, y - 1, '#9980FA')];
    }
  }, {
    key: 'shadowRot',
    value: function shadowRot(rX, rY) {
      this.squares[1].move(-1 * rY, -1 * rX);
      this.squares[2].move(-1 * rX, 1 * rY);

      this.squares[3].move(2 * rY * (this.r % 2 ? 1 : 0), 2 * rY * (this.r % 2 ? 0 : 1));
    }
  }]);

  return Z;
}(Figure);

var S = exports.S = function (_Figure7) {
  _inherits(S, _Figure7);

  function S(x, y, r) {
    _classCallCheck(this, S);

    var _this7 = _possibleConstructorReturn(this, (S.__proto__ || Object.getPrototypeOf(S)).call(this, x, y, r));

    _this7.name = 'S';
    _this7.init();
    return _this7;
  }

  _createClass(S, [{
    key: 'init',
    value: function init() {
      var x = this.sX;
      this.x = this.sX;
      var y = this.sY;
      this.y = this.sY;
      this.r = 0;
      this.squares = [new _Square.Square(x, y, '#B53471'), new _Square.Square(x - 1, y, '#B53471'), new _Square.Square(x, y - 1, '#B53471'), new _Square.Square(x + 1, y - 1, '#B53471')];
    }
  }, {
    key: 'shadowRot',
    value: function shadowRot(rX, rY) {
      this.squares[1].move(1 * rY, 1 * rX);
      this.squares[2].move(-1 * rX, 1 * rY);
      this.squares[3].move(-2 * rX * (this.r % 2 ? 0 : 1), -2 * rX * (this.r % 2 ? 1 : 0));
    }
  }]);

  return S;
}(Figure);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable import/prefer-default-export */
var Square = exports.Square = function () {
  function Square(x, y, color) {
    _classCallCheck(this, Square);

    this.x = x;
    this.y = y;
    this.color = color;

    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
  }

  _createClass(Square, [{
    key: 'move',
    value: function move(aX, aY) {
      this.x += aX;
      this.y += aY;
    }
  }, {
    key: 'update',
    value: function update(newX, newY) {
      this.x = newX;
      this.y = newY;
    }
  }, {
    key: 'checkForColision',
    value: function checkForColision(aX, aY, squares) {
      var colided = false;

      var newX = this.x + aX;
      var newY = this.y + aY;

      squares.forEach(function (square) {
        if (square.x == newX && square.y == newY) {
          colided = true;
        }
      });

      if (newX > 9) return true;
      if (newX < 0) return true;
      if (newY > 19) return true;

      return colided;
    }
  }, {
    key: 'draw',
    value: function draw(scale) {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x * scale, this.y * scale, 1 * scale, 1 * scale);
    }
  }]);

  return Square;
}();

/***/ })
/******/ ]);