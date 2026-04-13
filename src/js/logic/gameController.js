import { createPlayer } from "../factories/playerFactory"
import { initBoard, updateCell } from "../ui/boardUI";
import { FLEET_SCHEMA } from "./fleetConfig";
import { placeFleetRandomly } from "./placementLogic";

export const startGame = () => {
    const player = createPlayer('Du');
    const computer = createPlayer('Computer', 'computer');

    const playerContainer = document.getElementById('player-board');
    const enemyContainer = document.getElementById('enemy-board');

    placeFleetRandomly(player.board, FLEET_SCHEMA);
    placeFleetRandomly(computer.board, FLEET_SCHEMA);

    initBoard(enemyContainer, (index) => handleTurn(index));
    initBoard(playerContainer, () => {});

    player.board.getGrid().forEach((field, index) => {
        if (field.ship) {
            updateCell(playerContainer, index, 'initial', true);
        }
    });

    const handleTurn = (index) => {
        const attackResult = computer.board.receiveAttack(index);

        if (attackResult.status === 'invalid') return;

        updateCell(enemyContainer, index, attackResult.status);

        if (attackResult.allSunk) {
            alert("SIEG");
            return;
        }

        setTimeout(() => {
            const cpuIndex = computer.getRandomMove(player.board);
            const cpuResult = player.board.receiveAttack(cpuIndex);

            updateCell(playerContainer, cpuIndex, cpuResult.status);

            if (cpuResult.allSunk) {
                alter("Maschinen sind besser")
            }
        }, 500);
    };
    return { player, computer}
};