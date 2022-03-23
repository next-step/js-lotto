import { getRandomNumber } from "./getRandomNumber";

export function makeNonDuplicatedRandomNumbers(count, min, max) {
    const numbers = new Set();
    while (numbers.size !== count) {
        numbers.add(getRandomNumber(min, max));
    }

    return [...numbers];
}
