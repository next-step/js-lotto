class PrizeLotto {

    static MINIMUM_LOTTO_NUM = 1;
    static MAXIMUM_LOTTO_NUM = 45;
    static LOTTO_LENGTH = 6;

    static LOTTO_NUM_RANGE_MESSAGE = "로또 숫자는 1 ~ 45 사이의 숫자이여야 합니다.";
    static PRIZE_LOTTO_DUPLICATE_MESSAGE = "당첨 숫자는 중복되면 안됩니다.";
    static LOTTO_NUM_MESSAGE = "로또 숫자는 6개 이여야 합니다."
    static BONUS_NUM_DUPLICATE_MESSAGE = "보너스 숫자는 당첨번호와 중복되면 안됩니다."

    #prizeLotto;
    #bonusNum;

    constructor(prizeLotto, bonusNum) {
        this.#confirmPrizeNum(prizeLotto);
        this.#prizeLotto = prizeLotto;

        this.#confirmBonusNum(bonusNum);
        this.#bonusNum = bonusNum;
    }

    get getPrizeLotto() {
        return this.#prizeLotto;
    }

    get getBonusNum() {
        return this.#bonusNum;
    }

    #confirmPrizeNum(prizeLotto) {
        this.#confirmPrizeNumLength(prizeLotto);
        this.#confirmPrizeNumDuplicate(prizeLotto);
        this.#confirmPrizeNumRange(prizeLotto)
    }

    #confirmPrizeNumDuplicate(prizeLotto) {
        const uniquePrizes = new Set(prizeLotto);
        if (uniquePrizes.size !== prizeLotto.length) {
            throw new Error(PrizeLotto.PRIZE_LOTTO_DUPLICATE_MESSAGE);
        }
    }

    #confirmPrizeNumRange(prizeLotto) {
        for (const number of prizeLotto) {
            this.#confirmLottoNumRange(number);
        }
    }

    #confirmPrizeNumLength(prizeLotto) {
        if (prizeLotto.length !== PrizeLotto.LOTTO_LENGTH) {
            throw new Error(PrizeLotto.LOTTO_NUM_MESSAGE);
        }
    }

    #confirmLottoNumRange(number) {
        if (PrizeLotto.MINIMUM_LOTTO_NUM > number || PrizeLotto.MAXIMUM_LOTTO_NUM < number) {
            throw new Error(PrizeLotto.LOTTO_NUM_RANGE_MESSAGE);
        }
    }

    #confirmBonusNum(number) {
        this.#confirmLottoNumRange(number);
        this.#confirmBonusNumDuplicate(number);
    }

    #confirmBonusNumDuplicate(number) {
        if(this.#prizeLotto.includes(number)) {
            throw new Error(PrizeLotto.BONUS_NUM_DUPLICATE_MESSAGE);
        }
    }
}

export default PrizeLotto;