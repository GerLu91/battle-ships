
let isVertical = false;

function updateToolTip(isVertical){
    (isVertical) ? console.log('Ship will be placed vertically') : console.log('Ship will be placed horizontally')
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Shift' && !isVertical){
        isVertical = true;
        updateToolTip(isVertical);
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key==='Shift'){
        isVertical = false;
        updateToolTip(isVertical);
    }
})

export function initDragAndDrop(playerBoard, createShip){

    const ships = document.querySelectorAll('.ship-preview');
    ships.forEach((ship) => {
        ship.addEventListener('dragstart', (e) => {
            let length = ship.dataset.length;
            e.dataTransfer.setData('text/plain', length);
            console.log(`Ziehe Schiff der Länge ${length}`);
        }
        )
    })

    
    const board = document.querySelector('#player-board');
    board.addEventListener('dragover', (e) => {
        e.preventDefault();
    })

    board.addEventListener('drop', (e) => {
        const length = e.dataTransfer.getData('text/plain');
        if (!length) return;
        const newShip = createShip(parseInt(length));
        if (!e.target.dataset.index) return;
        const index = e.target.dataset.index;
        const startIndex = parseInt(index);
        const isPlaced = playerBoard.placeShip(newShip, parseInt(index), isVertical);
        if (isPlaced){
            for (let i = 0; i < length; i++){
            let currentCellIndex = (isVertical) ? startIndex + (i *10) : startIndex + i;
            const cell = e.currentTarget.querySelector(`[data-index="${currentCellIndex}"]`);
            if (cell) cell.classList.add('.ship');
        }
            console.log("Platzieren hat geklappt");
        } else {
            console.log("Platzierung fehlgeschlagen");
        }

        
        console.log(`Länge Schiff ${length}, index zum platzieren ${index}, Ausrichtung: ${isVertical}`)
    } )

}


