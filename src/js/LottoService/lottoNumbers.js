import { COUNT_NUMBERS_PER_TICKET } from "../constants";

export class LottoNumbers {
    constructor(randomNumbers) {
        if (randomNumbers.length < COUNT_NUMBERS_PER_TICKET) {
            throw new Error();
        }
        this.randomNumbers = randomNumbers;
    }

    getRandomNumbers() {
        return this.randomNumbers;
    }

    getNormalNumbers() {
        return this.randomNumbers.slice(0, randomNumbers.length - 1);
    }

    getBonusNumber() {
        return this.randomNumbers[this.randomNumbers.length - 1];
    }

    static valueOf(value) {
        const instance = this.array.find((number) => number === value);
        if (!instance) {
            throw new Error();
        }
        return instance;
    }
}