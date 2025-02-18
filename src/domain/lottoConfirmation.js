import LottoResult from "./LottoResult.js";

class LottoConfirmation {

    static THREE_MATCH_PRICE = 5000;
    static FOUR_MATCH_PRICE = 50000;
    static FIVE_MATCH_PRICE = 1500000;
    static FIVE_BONUS_MATCH_PRICE = 30000000;
    static SIX_MATCH_PRICE = 2000000000;

    static MINIMUM_LOTTO_NUM = 1;
    static MAXIMUM_LOTTO_NUM = 45;
    static LOTTO_LENGTH = 6;

    static LOTTO_NUM_RANGE_MESSAGE = "로또 숫자는 1 ~ 45 사이의 숫자이여야 합니다.";
    static PRIZE_LOTTO_DUPLICATE_MESSAGE = "당첨 숫자는 중복되면 안됩니다.";
    static LOTTO_NUM_MESSAGE = "로또 숫자는 6개 이여야 합니다."
    static BONUS_NUM_DUPLICATE_MESSAGE = "보너스 숫자는 당첨번호와 중복되면 안됩니다."

    #prizeLotto;
    #lottos;
    #bonusNum;
    #totalPrize;
    #lottoResult;

    constructor(lottos, prizeLotto, bonusNum) {
        this.#confirmPrizeNum(prizeLotto);
        this.#prizeLotto = prizeLotto;

        this.#confirmBonusNum(bonusNum);
        this.#bonusNum = bonusNum;

        this.#lottos = lottos;
        this.#totalPrize = 0;
        this.#lottoResult = new LottoResult();

        this.#checkMatches();
        this.#calculateTotalPrice();
    }

    get getTotalPrize() {
        return this.#totalPrize;
    }

    get getLottoResult() {
        return this.#lottoResult;
    }

    #confirmPrizeNum(prizeLotto) {
        this.#confirmPrizeNumLength(prizeLotto);
        this.#confirmPrizeNumDuplicate(prizeLotto);
        this.#confirmPrizeNumRange(prizeLotto)
    }

    #confirmPrizeNumDuplicate(prizeLotto) {
        const uniquePrizes = new Set(prizeLotto);
        if (uniquePrizes.size !== prizeLotto.length) {
            throw new Error(LottoConfirmation.PRIZE_LOTTO_DUPLICATE_MESSAGE);
        }
    }

    #confirmPrizeNumRange(prizeLotto) {
        for (const number of prizeLotto) {
            this.#confirmLottoNumRange(number);
        }
    }

    #confirmPrizeNumLength(prizeLotto) {
        if (prizeLotto.length !== LottoConfirmation.LOTTO_LENGTH) {
            throw new Error(LottoConfirmation.LOTTO_NUM_MESSAGE);
        }
    }

    #confirmLottoNumRange(number) {
        if (LottoConfirmation.MINIMUM_LOTTO_NUM > number || LottoConfirmation.MAXIMUM_LOTTO_NUM < number) {
            throw new Error(LottoConfirmation.LOTTO_NUM_RANGE_MESSAGE);
        }
    }

    #confirmBonusNum(number) {
        this.#confirmLottoNumRange(number);
        this.#confirmBonusNumDuplicate(number);
    }

    #confirmBonusNumDuplicate(number) {
        if(this.#prizeLotto.includes(number)) {
            throw new Error(LottoConfirmation.BONUS_NUM_DUPLICATE_MESSAGE);
        }
    }

    #checkMatches() {
        this.#lottos.forEach(lotto => {
            const matchedCount = lotto.lottoNumbers.filter(number => this.#prizeLotto.includes(number)).length;
            const hasBonus = lotto.lottoNumbers.some(number => number === this.#bonusNum);
            this.#lottoResult.addResult(matchedCount, hasBonus);
        });
    }

    #calculateTotalPrice() {
        this.#lottoResult.resultMap.forEach((count, matchedCount) => {
            switch (matchedCount) {
                case 3:
                    this.#totalPrize += LottoConfirmation.THREE_MATCH_PRICE * count;
                    break;
                case 4:
                    this.#totalPrize += LottoConfirmation.FOUR_MATCH_PRICE * count;
                    break;
                case 5:
                    this.#totalPrize += LottoConfirmation.FIVE_MATCH_PRICE * count;
                    break;
                case 6:
                    this.#totalPrize += LottoConfirmation.FIVE_BONUS_MATCH_PRICE * count;
                    break;
                case 7:
                    this.#totalPrize += LottoConfirmation.SIX_MATCH_PRICE * count;
                    break;
                default:
                    break;
            }
        });

        return this.#totalPrize;
    }

    calculateRateOfReturn(price) {
        return (this.#totalPrize / price) * 100;
    }
}

export default LottoConfirmation;