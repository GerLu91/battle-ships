export const initBoard = (containerElement,boardModel, clickHandler, isHidden = false) => {
    containerElement.innerHTML = '';
    const grid = boardModel.getGrid();
     grid.forEach((field, i) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;

        if (!isHidden && field.ship !== null) {
            cell.classList.add('ship');
        }

        cell.addEventListener('click', () => clickHandler(i));
        containerElement.appendChild(cell);

    })
};

export const updateCell = (containerElement, index, result, isShip = false) => {
    const cell = containerElement.querySelector(`[data-index="${index}"]`);

    if (result === 'hit') cell.classList.add('hit');
    if (result === 'miss') cell.classList.add('miss');
    if (result === 'initial' || isShip) cell.classList.add('ship');

    if (result.isSunk) {
        cell.classList.add('sunk');
    }
};