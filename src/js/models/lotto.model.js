import { LOTTO_LIMIT_DIGITS, LOTTO_RANGE_MAX, LOTTO_RANGE_MIN } from "../utils/const.js";
import { arr, getRandom } from "../utils/util.js";

export class LottoModel {
    #numberSet;

    constructor(units) {
        this.#numberSet = this.setBundles(units);
    }

    get numberSet() {
        return this.#numberSet;
    }

    setBundles = (units) => {
        return arr(units).map(() => this.#setBundle());
    }

    #setBundle = () => {
        const numbers = new Set();
        while (numbers.size < LOTTO_LIMIT_DIGITS) {
            numbers.add(getRandom(LOTTO_RANGE_MIN, LOTTO_RANGE_MAX));
        }

        return [...numbers];
    }
}