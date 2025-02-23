import LottoNumber from "./LottoNumber.js";
class Lotto {

    static LOTTO_SIZE = 6;
    static LOTTO_NUMBER_RANGE = 45;

    static LOTTO_DUPLICATE_MESSAGE = "로또 숫자는 중복되면 안됩니다.";
    static LOTTO_NUM_MESSAGE = "로또 숫자는 6개 이여야 합니다."

    #lottoNumbers;

    constructor(lottoNumbers) {
        this.#validateLottoNumber(lottoNumbers);
        this.#lottoNumbers = this.#createLottoNumbers(lottoNumbers);
    }

    get value() {
        return this.#lottoNumbers.map(lottoNumber => lottoNumber.value);
    }

    checkMatches(lotto) {
        return this.#lottoNumbers.filter(number => lotto.includes(number.value)).length;
    }

    checkBonus(bonumNumber) {
        return this.#lottoNumbers.some(number => number.value === bonumNumber);
    }

    #createLottoNumbers(lottoNumbers) {
        return lottoNumbers.map(number => new LottoNumber(number));
    }

    #validateLottoNumber(lotto) {
        this.#validateLottoNumberDuplicate(lotto);
        this.#validateLottoNumberLength(lotto);
    }

    #validateLottoNumberDuplicate(lotto) {
        if (new Set(lotto).size !== lotto.length) {
            throw new Error(Lotto.LOTTO_DUPLICATE_MESSAGE);
        }
    }

    #validateLottoNumberLength(lotto) {
        if (lotto.length !== Lotto.LOTTO_SIZE) {
            throw new Error(Lotto.LOTTO_NUM_MESSAGE);
        }
    }

}

export default Lotto;