import LottoNumber from "./LottoNumber.js";
import Lotto from "./Lotto.js";
class PrizeLotto {

    static MINIMUM_LOTTO_NUM = 1;
    static MAXIMUM_LOTTO_NUM = 45;
    static LOTTO_LENGTH = 6;

    static PRIZE_LOTTO_DUPLICATE_MESSAGE = "당첨 숫자는 중복되면 안됩니다.";
    static LOTTO_NUM_MESSAGE = "로또 숫자는 6개 이여야 합니다."
    static BONUS_NUM_DUPLICATE_MESSAGE = "보너스 숫자는 당첨번호와 중복되면 안됩니다."

    #prizeLotto;
    #bonusNumer;

    constructor(prizeLotto, bonusNumber) {
        this.#validatePrizeNumber(prizeLotto);
        this.#prizeLotto = this.#createLottoNumbers(prizeLotto);
        this.#validateBonusNumberDuplicate(bonusNumber);
        this.#bonusNumer = new LottoNumber(bonusNumber);
    }

    get value() {
        return this.#prizeLotto.value;
    }

    get bonusNumer() {
        return this.#bonusNumer.value;
    }

    #validatePrizeNumber(prizeLotto) {
        this.#validatePrizeNumberDuplicate(prizeLotto);
        this.#validatePrizeNumerLength(prizeLotto);
    }

    #validatePrizeNumberDuplicate(prizeLotto) {
        const uniquePrizes = new Set(prizeLotto);
        if (uniquePrizes.size !== prizeLotto.length) {
            throw new Error(PrizeLotto.PRIZE_LOTTO_DUPLICATE_MESSAGE);
        }
    }

    #validatePrizeNumerLength(prizeLotto) {
        if (prizeLotto.length !== PrizeLotto.LOTTO_LENGTH) {
            throw new Error(PrizeLotto.LOTTO_NUM_MESSAGE);
        }
    }

    #validateBonusNumberDuplicate(number) {
        if (this.#prizeLotto.value.includes(number)) {
            throw new Error(PrizeLotto.BONUS_NUM_DUPLICATE_MESSAGE);
        }
    }

    #createLottoNumbers(lottoNumbers) {
        return new Lotto(lottoNumbers);
    }
}

export default PrizeLotto;