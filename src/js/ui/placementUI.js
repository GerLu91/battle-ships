
let isVertical = false;
let draggedElement = null;

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

export function renderShipDrawer(fleetConfig){
    const drawer = document.getElementById('ship-drawer');
    drawer.innerHTML = '';

    fleetConfig.forEach((ship) => {
        const shipPreview = document.createElement('div');
        shipPreview.classList.add('ship-preview');
        shipPreview.draggable = true;
        shipPreview.dataset.length = ship.length;

        for (let i=0; i < ship.length; i++){
            const segment = document.createElement('div');
            segment.classList.add('ship-segment');
            shipPreview.appendChild(segment);
        }
        drawer.appendChild(shipPreview);
    })
    
}


export function initDragAndDrop(playerBoard, createShip){

    const ships = document.querySelectorAll('.ship-preview');
    ships.forEach((ship) => {
        ship.addEventListener('dragstart', (e) => {
            draggedElement = e.target;
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
        e.preventDefault();
        const length = e.dataTransfer.getData('text/plain');
        if (!length) return;
        const newShip = createShip(parseInt(length));
        if (!e.target.dataset.index) return;
        const index = e.target.dataset.index;
        const startIndex = parseInt(index);
        const isPlaced = playerBoard.placeShip(newShip, parseInt(index), isVertical);
        if (isPlaced){
            draggedElement.remove();
            for (let i = 0; i < length; i++){
            const currentCellIndex = (isVertical) ? startIndex + (i *10) : startIndex + i;
            const cell = e.currentTarget.querySelector(`[data-index="${currentCellIndex}"]`);
            if (cell) cell.classList.add('ship');
        }
            checkPlacementComplete();
            console.log("Platzieren hat geklappt");
        } else {
            console.log("Platzierung fehlgeschlagen");
        }

        
        console.log(`Länge Schiff ${length}, index zum platzieren ${index}, Ausrichtung: ${isVertical}`)
    } )

}

export function checkPlacementComplete(){
    const shipsLeft = document.querySelectorAll('.ship-preview').length;
    if (shipsLeft === 0) {
        const button = document.querySelector('#start-game');
        button.classList.remove('hidden');
        button.disabled = false;
    }
}


