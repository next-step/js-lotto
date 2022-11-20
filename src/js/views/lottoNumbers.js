import { LOTTO_LIMIT_NUMBERS, LOTTO_RANGE_MAX, LOTTO_RANGE_MIN } from "../utils/const.js";
import { getRandom } from "../utils/util.js";

export class LottoNumbers {
    _numbers;

    constructor() {
        this._numbers = this.#setLottoNumbers();
    }

    get numbers() {
        return this._numbers;
    }

    #setLottoNumbers = () => {
        const numbers = new Set();
        while (numbers.size < LOTTO_LIMIT_NUMBERS) {
            numbers.add(getRandom(LOTTO_RANGE_MIN, LOTTO_RANGE_MAX));
        }

        return [...numbers];
    }
}