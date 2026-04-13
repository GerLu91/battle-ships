import { startGame } from './logic/gameController.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Battleship App initialisiert...");
    
    startGame();
});