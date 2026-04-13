import { createGameboard } from "./gameboardFactory"


export const createPlayer = (name, type = 'human') => {
    const board = createGameboard();

    const getRandomMove = (enemyBoard) => {
        let index;
        const grid = enemyBoard.getGrid();
        do {
            index = Math.floor(Math.random() * 100);
        } while (grid[index].isHit);
        return index;
    };

    return {
        name,
        type,
        board,
        getRandomMove
    };
};