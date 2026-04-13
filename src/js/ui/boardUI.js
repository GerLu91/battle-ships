export const initBoard = (containerElement, clickHandler) => {
    containerElement.innerHTML = '';
    for (let i=0; i< 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;

        cell.addEventListener('click', () => clickHandler(i));
        containerElement.appendChild(cell);

    }
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