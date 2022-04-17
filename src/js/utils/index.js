import { NUM } from '../constants/index.js';

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export function getRandomNumber() {
    return Math.floor(
        Math.random() * (NUM.MAX_RANDOM - NUM.MIN_RANDOM) + NUM.MIN_RANDOM
    );
}
