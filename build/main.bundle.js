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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _GameLoop = __webpack_require__(2);

var _Game = __webpack_require__(3);

var game = new _Game.Game();
var gameLoop = new _GameLoop.GameLoop(30, game);

game.init();
gameLoop.gameLoop();
gameLoop.gameLogicLoop();

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', game.resize.bind(game));
document.addEventListener('resize', game.resize.bind(game));
document.addEventListener('orientationchange', game.resize.bind(game));

document.addEventListener('keydown', function (e) {
    game.keyMapDown[e.keyCode] = true;
});

document.addEventListener('keyup', function (e) {
    game.keyMapDown[e.keyCode] = false;
    if (e.keyCode === 32 && !gameLoop.pause) game.currentFigure.rotate();
    if (e.keyCode === 80) gameLoop.pauseGame();
    if (e.keyCode === 82) game.init();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameLoop = exports.GameLoop = function () {
  function GameLoop(fps, game) {
    _classCallCheck(this, GameLoop);

    this.fps = fps;
    this.then = Date.now();
    this.then2 = Date.now();
    this.delta;
    this.delta2;
    this.now;
    this.interval = 1000 / this.fps;
    this.pause = false;

    this.game = game;
  }

  _createClass(GameLoop, [{
    key: "pauseGame",
    value: function pauseGame() {
      this.pause = !this.pause;
    }
  }, {
    key: "gameLoop",
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
    key: "gameLogicLoop",
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Square = __webpack_require__(0);

var _Figure = __webpack_require__(4);

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

        this.currentFigure;
        this.squares = [];
        this.lvl = 1;
        this.points = 0;
        this.tick = 0;
    }

    _createClass(Game, [{
        key: 'init',
        value: function init() {
            this.squares = [];
            this.lvl = 1;
            this.points = 0;
            this.tick = 0;
            this.newFigure();
            this.updateUI();
        }
    }, {
        key: 'updateUI',
        value: function updateUI() {
            // document.querySelector('.game-panel__points span').innerHTML = this.points;
            // document.querySelector('.game-panel__lvl span').innerHTML = this.lvl;
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

            this.canvas.height = this.scale * this.height;
            this.canvas.width = this.scale * this.width;
        }
    }, {
        key: 'newFigure',
        value: function newFigure() {
            var rand = Math.floor(Math.random() * 7) + 1;
            if (rand === 1) this.currentFigure = new _Figure.Stick(4, -2);else if (rand === 2) this.currentFigure = new _Figure.Block(4, -1);else if (rand === 3) this.currentFigure = new _Figure.L(4, 0);else if (rand === 4) this.currentFigure = new _Figure.J(4, 0);else if (rand === 5) this.currentFigure = new _Figure.T(4, 0);else if (rand === 6) this.currentFigure = new _Figure.Z(4, 0);else this.currentFigure = new _Figure.S(4, 0);
        }
    }, {
        key: 'checkIfLost',
        value: function checkIfLost() {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < this.squares.length; j++) {
                    if (this.currentFigure.squares[i].x === this.squares[j].x && this.currentFigure.squares[i].y === this.squares[j].y) {
                        this.gameOver();
                    }
                }
            }
        }
    }, {
        key: 'checkFullRows',
        value: function checkFullRows() {
            var rows = [];
            for (var i = 0; i < this.height; i++) {
                if (this.checkFullRow(i)) rows.push(i);
            }

            rows = rows.sort(function (a, b) {
                //sort them to start from bottom to top
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

            if (row.length == 10) {
                return true;
            }

            return false;
        }
    }, {
        key: 'killFullRow',
        value: function killFullRow(y) {
            for (var i = 0; i < this.squares.length; i++) {
                if (this.squares[i].y === y) {
                    delete this.squares[i];
                    this.squares.splice(i, 1);
                    i--;
                    continue;
                }
            }
        }
    }, {
        key: 'collapseRows',
        value: function collapseRows(rows) {
            var _this = this;

            for (var i = 0; i < rows.length; i++) {
                var _loop = function _loop(j) {
                    //every row higher or equal to deleted row
                    _this.squares.forEach(function (sqr) {
                        //for every square
                        if (sqr.y === j) {
                            if (!sqr.checkForColision(0, 1, _this.squares)) {
                                //if no colision
                                sqr.move(0, 1); //move square down
                            }
                        }
                    });
                };

                //deleted row
                for (var j = rows[i]; j >= 0; j--) {
                    _loop(j);
                }
            }
        }
    }, {
        key: 'gameOver',
        value: function gameOver() {
            this.init();
        }
    }, {
        key: 'gravitate',
        value: function gravitate() {
            if (this.tick % 10 === 0) this.currentFigure.move(0, 1, this.squares);
        }
    }, {
        key: 'listenEvents',
        value: function listenEvents() {
            if (this.keyMapDown[83]) this.currentFigure.move(0, 1, this.squares);else if (this.keyMapDown[68]) this.currentFigure.move(1, 0, this.squares);else if (this.keyMapDown[65]) this.currentFigure.move(-1, 0, this.squares);
        }
    }, {
        key: 'gameUpdate',
        value: function gameUpdate() {
            var _this2 = this;

            this.gravitate();

            if (this.currentFigure.current === false) {
                this.squares = [].concat(_toConsumableArray(this.squares), _toConsumableArray(this.currentFigure.squares));

                var fullRows = this.checkFullRows();
                if (fullRows.length > 0) {
                    fullRows.forEach(function (row) {
                        _this2.killFullRow(row);
                    });
                    this.collapseRows(fullRows);
                }

                this.newFigure();
                this.checkIfLost();
            }

            this.listenEvents();

            this.tick++;
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.S = exports.Z = exports.T = exports.J = exports.L = exports.Block = exports.Stick = exports.Figure = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Square = __webpack_require__(0);

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Figure = exports.Figure = function () {
    function Figure(x, y) {
        _classCallCheck(this, Figure);

        this.x = x;
        this.y = y;
        this.r = 0;
        this.current = true;
    }

    _createClass(Figure, [{
        key: 'rot',
        value: function rot(rX, rY) {}
    }, {
        key: 'rotate',
        value: function rotate() {
            var rX = void 0,
                rY = void 0;
            if (this.r == 0) {
                rX = 1;rY = 1;
            }
            if (this.r == 1) {
                rX = -1;rY = 1;
            }
            if (this.r == 2) {
                rX = -1;rY = -1;
            }
            if (this.r == 3) {
                rX = 1;rY = -1;
            }

            this.rot(rX, rY);

            this.r++;
            this.r = this.r % 4;
        }
    }, {
        key: 'checkForColision',
        value: function checkForColision(x, y, squares) {
            var colided = false;

            this.squares.forEach(function (square) {
                if (square.checkForColision(x, y, squares)) {
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
                //if moving down and colided
                stopMoving = true;
            } else if (y >= 0 && this.checkForColision(x, y, squares)) {
                //if moving in x dir and colided
                return false;
            }

            if (stopMoving) {
                this.current = false;
            } else {
                this.squares.forEach(function (square) {
                    square.move(x, y);
                });
            }
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

        _this.squares = [new _Square.Square(x, y + 1, 'blue'), new _Square.Square(x, y, 'blue'), new _Square.Square(x, y + 2, 'blue'), new _Square.Square(x, y + 3, 'blue')];
        return _this;
    }

    _createClass(Stick, [{
        key: 'rot',
        value: function rot(rX, rY) {
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

        _this2.squares = [new _Square.Square(x, y, 'yellow'), new _Square.Square(x + 1, y, 'yellow'), new _Square.Square(x, y + 1, 'yellow'), new _Square.Square(x + 1, y + 1, 'yellow')];
        return _this2;
    }

    return Block;
}(Figure);

var L = exports.L = function (_Figure3) {
    _inherits(L, _Figure3);

    function L(x, y, r) {
        _classCallCheck(this, L);

        var _this3 = _possibleConstructorReturn(this, (L.__proto__ || Object.getPrototypeOf(L)).call(this, x, y, r));

        _this3.squares = [new _Square.Square(x, y, 'violet'), new _Square.Square(x + 1, y, 'violet'), new _Square.Square(x, y - 1, 'violet'), new _Square.Square(x, y - 2, 'violet')];
        return _this3;
    }

    _createClass(L, [{
        key: 'rot',
        value: function rot(rX, rY) {
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

        _this4.squares = [new _Square.Square(x, y, 'orangered'), new _Square.Square(x - 1, y, 'orangered'), new _Square.Square(x, y - 1, 'orangered'), new _Square.Square(x, y - 2, 'orangered')];
        return _this4;
    }

    _createClass(J, [{
        key: 'rot',
        value: function rot(rX, rY) {
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

        _this5.squares = [new _Square.Square(x, y, 'lightgreen'), new _Square.Square(x, y - 1, 'lightgreen'), new _Square.Square(x + 1, y, 'lightgreen'), new _Square.Square(x - 1, y, 'lightgreen')];
        return _this5;
    }

    _createClass(T, [{
        key: 'rot',
        value: function rot(rX, rY) {
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

        _this6.squares = [new _Square.Square(x, y, 'grey'), new _Square.Square(x + 1, y, 'grey'), new _Square.Square(x, y - 1, 'grey'), new _Square.Square(x - 1, y - 1, 'grey')];
        return _this6;
    }

    _createClass(Z, [{
        key: 'rot',
        value: function rot(rX, rY) {
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

        _this7.squares = [new _Square.Square(x, y, 'white'), new _Square.Square(x - 1, y, 'white'), new _Square.Square(x, y - 1, 'white'), new _Square.Square(x + 1, y - 1, 'white')];
        return _this7;
    }

    _createClass(S, [{
        key: 'rot',
        value: function rot(rX, rY) {
            this.squares[1].move(1 * rY, 1 * rX);
            this.squares[2].move(-1 * rX, 1 * rY);
            this.squares[3].move(-2 * rX * (this.r % 2 ? 0 : 1), -2 * rX * (this.r % 2 ? 1 : 0));
        }
    }]);

    return S;
}(Figure);

/***/ })
/******/ ]);