import { GameLoop } from './GameLoop';
import { Game } from './Game';

const game = new Game(); 
const gameLoop = new GameLoop(30, game);


gameLoop.loop();

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', game.resize.bind(game));
document.addEventListener('resize', game.resize.bind(game));

