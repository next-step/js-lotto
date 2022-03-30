import { getRandomNumber } from "./getRandomNumber.js";

export function makeNonDuplicatedRandomNumbers(count, min, max) {
    const numbers = new Set();
    while (numbers.size !== count) {
        numbers.add(getRandomNumber(min, max));
    }

    return [...numbers];
}

export default makeNonDuplicatedRandomNumbers;