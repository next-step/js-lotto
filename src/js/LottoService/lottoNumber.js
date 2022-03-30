import { MAX_NUMBER, MIN_NUMBER } from "../constants";

export class LottoNumber {
    constructor(value) {
        if (value < MIN_NUMBER || MAX_NUMBER < value) {
            throw new Error();
        }
        this.value = value;
    }

    get value() {
        return this.value;
    }
}