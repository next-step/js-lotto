import LottoNumber from "./LottoNumber.js";
import Lotto from "./Lotto.js";
class PrizeLotto {

    static MINIMUM_LOTTO_NUM = 1;
    static MAXIMUM_LOTTO_NUM = 45;
    static LOTTO_LENGTH = 6;

    static BONUS_NUM_DUPLICATE_MESSAGE = "보너스 숫자는 당첨번호와 중복되면 안됩니다."

    #prizeLotto;
    #bonusNumber;

    constructor(prizeLotto, bonusNumber) {
        this.#prizeLotto = this.#createLotto(prizeLotto);
        this.#validateBonusNumberDuplicate(bonusNumber);
        this.#bonusNumber = new LottoNumber(bonusNumber);
    }

    get value() {
        return this.#prizeLotto.value;
    }

    get bonusNumber() {
        return this.#bonusNumber.value;
    }

    #validateBonusNumberDuplicate(number) {
        if (this.#prizeLotto.value.includes(number)) {
            throw new Error(PrizeLotto.BONUS_NUM_DUPLICATE_MESSAGE);
        }
    }

    #createLotto(lottoNumbers) {
        return new Lotto(lottoNumbers);
    }
}

export default PrizeLotto;