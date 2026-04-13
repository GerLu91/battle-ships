export const createShip = (length) => {

    let hits = 0;

    return {
        length,

        hit: () => {
            if (hits < length){
                hits++;
            }
        },

        isSunk: () => hits >= length,

        getHits: () => hits
    }
}