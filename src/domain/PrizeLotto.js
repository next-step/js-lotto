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
        this.#confirmPrizeNum(prizeLotto);
        this.#prizeLotto = this.#createLottoNumbers(prizeLotto);
        this.#confirmBonusNumDuplicate(bonusNum);
        this.#bonusNum = new LottoNumber(bonusNum);
    }

    get getPrizeLotto() {
        return this.#prizeLotto.map(lottoNumber => lottoNumber.getLottoNumber);
    }

    get getBonusNum() {
        return this.#bonusNum.getLottoNumber;
    }

    #confirmPrizeNum(prizeLotto) {
        this.#confirmPrizeNumLength(prizeLotto);
        this.#confirmPrizeNumDuplicate(prizeLotto);
    }

    #confirmPrizeNumDuplicate(prizeLotto) {
        const uniquePrizes = new Set(prizeLotto);
        if (uniquePrizes.size !== prizeLotto.length) {
            throw new Error(PrizeLotto.PRIZE_LOTTO_DUPLICATE_MESSAGE);
        }
    }

    #confirmPrizeNumLength(prizeLotto) {
        if (prizeLotto.length !== PrizeLotto.LOTTO_LENGTH) {
            throw new Error(PrizeLotto.LOTTO_NUM_MESSAGE);
        }
    }

    #confirmBonusNumDuplicate(number) {
        const prizeNumbers = this.#prizeLotto.map(lottoNumber => lottoNumber.getLottoNumber);
        
        if (prizeNumbers.includes(number)) {
            throw new Error(PrizeLotto.BONUS_NUM_DUPLICATE_MESSAGE);
        }
    }

    #createLottoNumbers(lottoNumbers) {
        return lottoNumbers.map(number => new LottoNumber(number));
    }
}

export default PrizeLotto;