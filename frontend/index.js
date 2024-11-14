import { startGame } from './game.js';

window.onload = () => {
    const canvas = document.getElementById('pong');
    const context = canvas.getContext('2d');
    startGame(context);
};
