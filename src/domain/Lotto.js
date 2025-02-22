import LottoNumber from "./LottoNumber.js";
class Lotto {

    static LOTTO_SIZE = 6;
    static LOTTO_NUMBER_RANGE = 45;

    #lottoNumbers;

    constructor(lottoNumbers) {
        this.#lottoNumbers = this.#createLottoNumbers(lottoNumbers);
    }

    get value() {
        return this.#lottoNumbers.map(lottoNumber => lottoNumber.value);
    }

    checkMatches(prizeLotto) {
        return this.#lottoNumbers.filter(number => prizeLotto.value.includes(number.value)).length;
    }

    checkBonus(prizeLotto) {
        return this.#lottoNumbers.some(number => number.value === prizeLotto.bonusNum);
    }

    #createLottoNumbers(lottoNumbers) {
        return lottoNumbers.map(number => new LottoNumber(number));
    }

}

export default Lotto;