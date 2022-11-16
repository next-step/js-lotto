import { lottoLimitNumbers, lottoRangeMax, lottoRangeMin } from "../utils/const.js";
import { arr, getRandom } from "../utils/util.js";

export class LottoNumbers {
    numbers;

    constructor() {
        this.numbers = this.lottoNumbers();
    }

    lottoNumbers = () => {
        let numbers = arr(lottoLimitNumbers).map(_ => getRandom(lottoRangeMin, lottoRangeMax));
        numbers = [...new Set(numbers)];

        while (numbers.length < lottoLimitNumbers) {
            const random = getRandom(lottoRangeMin, lottoRangeMax);
            if (!numbers.includes(random)) numbers.push(random);
        }

        return numbers;
    }
}