export const createGameboard = () => {
    const size = 10;

    const grid = Array.from( {length: size * size}, () =>({
        ship:null,
        isHit: false,
    }));

    const ships = [];

    const placeShip = (ship, index, isVertical) => {
        const coords = [];

        for (let i=0; i < ship.length; i++){
            const currentCoord = isVertical ? index + i * size : index + i;

            if (!isVertical && Math.floor(currentCoord / size) !== Math.floor(index / size)){
                return false;
            }

            if (isVertical && currentCoord >= size * size){
                return false;
            }

            if (grid[currentCoord].ship !== null) {
                return false;
            }

            coords.push(currentCoord);
        }

        coords.forEach(coord => {
            grid[coord].ship = ship;
        });

        ships.push(ship);
        return true;
    }

    const receiveAttack = (index) => {

        const field = grid[index];

        if (field.isHit) return { status: 'invalid'};

        field.isHit = true;

        if (field.ship){
            field.ship.hit();
            return {
                status: 'hit',
                isSunk: field.ship.isSunk(),
                allSunk: ships.every(s => s.isSunk())
            };
        }

        return {status: 'miss'};
    };

    const placeFleetRandomly = (fleetConfig, shipFactory) => {
        fleetConfig.forEach(shipData => {
            let placed = false;
            while (!placed) {
                const isVertical = Math.random() > 0.5;
                const randomIndex = Math.floor(Math.random() * (size * size));
                
                const newShip = shipFactory(shipData.length);
                
                if (placeShip(newShip, randomIndex, isVertical)) {
                    placed = true;
                }
            }
        });
    };

    const reset = () => {
        ships.length = 0;

        grid.forEach(field =>{
            field.ship = null;
            field.isHit = false;
        });
    };

    return {
        placeShip,
        receiveAttack,
        placeFleetRandomly, 
        reset,
        getGrid: () => grid,
        allShipsSunk: () => ships.every(s => s.isSunk())
    };

};