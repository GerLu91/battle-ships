import { createShip } from "../factories/shipFactory";

export const placeFleetRandomly = (gameboard, fleetSchema) => {
    fleetSchema.forEach(shipData => {
        let placed = false;

        while (!placed){
            const randomIndex = Math.floor(Math.random() * 100);
            const isVertical = Math.random() < 0.5;
            const newShip = createShip(shipData.length);

            placed = gameboard.placeShip(newShip, randomIndex, isVertical);
        }
    });
};