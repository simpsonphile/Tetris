import { GameLoop } from './GameLoop';
import { Game } from './Game';


const game = new Game(); 
const gameLoop = new GameLoop(30, game);

game.init();
gameLoop.gameLoop();
gameLoop.gameLogicLoop();

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', game.resize.bind(game));
document.addEventListener('resize', game.resize.bind(game));
document.addEventListener('orientationchange', game.resize.bind(game));

document.addEventListener('keydown', e => {
    game.keyMapDown[e.keyCode] = true;
});

document.addEventListener('keyup', e => {
    game.keyMapDown[e.keyCode] = false;
    if(e.keyCode === 32) game.currentFigure.rotate();
});

