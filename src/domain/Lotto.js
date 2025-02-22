import LottoNumber from "./LottoNumber.js";
class Lotto {

    static LOTTO_SIZE = 6;
    static LOTTO_NUMBER_RANGE = 45;

    #numberRange;
    #lottoNumbers;

    constructor() {
        this.#numberRange = [...Array(Lotto.LOTTO_NUMBER_RANGE).keys()].map(i => i + 1);
        this.#lottoNumbers = this.#createLottoNumbers(this.#outputAutoLotto());
    }

    get value() {
        return this.#lottoNumbers.map(lottoNumber => lottoNumber.value);
    }

    #createLottoNumbers(lottoNumbers) {
        return lottoNumbers.map(number => new LottoNumber(number));
    }

    #outputAutoLotto() {
        this.#shuffleArray(this.#numberRange);
        return this.#numberRange.slice(0, Lotto.LOTTO_SIZE).sort((a, b) => a - b);
    }

    #shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

}

export default Lotto;