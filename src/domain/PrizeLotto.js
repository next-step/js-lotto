import LottoNumber from "./LottoNumber.js";
class PrizeLotto {

    static MINIMUM_LOTTO_NUM = 1;
    static MAXIMUM_LOTTO_NUM = 45;
    static LOTTO_LENGTH = 6;

    static PRIZE_LOTTO_DUPLICATE_MESSAGE = "당첨 숫자는 중복되면 안됩니다.";
    static LOTTO_NUM_MESSAGE = "로또 숫자는 6개 이여야 합니다."
    static BONUS_NUM_DUPLICATE_MESSAGE = "보너스 숫자는 당첨번호와 중복되면 안됩니다."

    #prizeLotto;
    #bonusNum;

    constructor(prizeLotto, bonusNum) {
        this.#validatePrizeNum(prizeLotto);
        this.#prizeLotto = this.#createLottoNumbers(prizeLotto);
        this.#validateBonusNumDuplicate(bonusNum);
        this.#bonusNum = new LottoNumber(bonusNum);
    }

    get value() {
        return this.#prizeLotto.map(lottoNumber => lottoNumber.value);
    }

    get bonusNum() {
        return this.#bonusNum.value;
    }

    #validatePrizeNum(prizeLotto) {
        this.#validatePrizeNumLength(prizeLotto);
        this.#validatePrizeNumDuplicate(prizeLotto);
    }

    #validatePrizeNumDuplicate(prizeLotto) {
        const uniquePrizes = new Set(prizeLotto);
        if (uniquePrizes.size !== prizeLotto.length) {
            throw new Error(PrizeLotto.PRIZE_LOTTO_DUPLICATE_MESSAGE);
        }
    }

    #validatePrizeNumLength(prizeLotto) {
        if (prizeLotto.length !== PrizeLotto.LOTTO_LENGTH) {
            throw new Error(PrizeLotto.LOTTO_NUM_MESSAGE);
        }
    }

    #validateBonusNumDuplicate(number) {
        const prizeNumbers = this.#prizeLotto.map(lottoNumber => lottoNumber.value);
        
        if (prizeNumbers.includes(number)) {
            throw new Error(PrizeLotto.BONUS_NUM_DUPLICATE_MESSAGE);
        }
    }

    #createLottoNumbers(lottoNumbers) {
        return lottoNumbers.map(number => new LottoNumber(number));
    }
}

export default PrizeLotto;