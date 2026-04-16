import { createPlayer } from "../factories/playerFactory"
import { createShip } from "../factories/shipFactory";
import { initBoard, updateCell } from "../ui/boardUI";
import { FLEET_SCHEMA } from "./fleetConfig";

export const initCombatPhase = (playerBoard) => {
    const computer = createPlayer('Computer', 'computer');
    computer.board.placeFleetRandomly(FLEET_SCHEMA, createShip);

    const playerContainer = document.getElementById('player-board');
    const enemyContainer = document.getElementById('enemy-board');

    enemyContainer.parentElement.classList.remove('hidden');


    const handleTurn = (index) => {
        const attackResult = computer.board.receiveAttack(index);

        if (attackResult.status === 'invalid') return;

        updateCell(enemyContainer, index, attackResult.status);

        if (attackResult.allSunk) {
            alert("SIEG");
            return;
        }

        setTimeout(() => {
            const cpuIndex = computer.getRandomMove(playerBoard);
            const cpuResult = playerBoard.receiveAttack(cpuIndex);

            updateCell(playerContainer, cpuIndex, cpuResult.status);

            if (cpuResult.allSunk) {
                alter("Maschinen sind besser")
            }
            enemyContainer.style.pointerEvents = 'auto';
        }, 500);
    };

    initBoard(enemyContainer, computer.board, handleTurn, true);
    initBoard(playerContainer, playerBoard, () => {}, false);

    playerContainer.style.pointerEvents = 'none';

    playerBoard.getGrid().forEach((field, index) => {
        if (field.ship) {
            updateCell(playerContainer, index, 'initial', true);
        }
    });

 

    
};