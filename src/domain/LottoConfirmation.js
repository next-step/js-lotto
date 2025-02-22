import LottoResult from "./LottoResult.js";

class LottoConfirmation {

    static THREE_MATCH_PRICE = 5000;
    static FOUR_MATCH_PRICE = 50000;
    static FIVE_MATCH_PRICE = 1500000;
    static FIVE_BONUS_MATCH_PRICE = 30000000;
    static SIX_MATCH_PRICE = 2000000000;

    #lottos;
    #totalPrize;
    #lottoResult;

    constructor(lottos, prizeLotto) {
        this.#lottos = lottos;
        this.#totalPrize = 0;
        this.#lottoResult = new LottoResult();

        this.#checkMatches(prizeLotto.value, prizeLotto.bonusNum);
        this.#calculateTotalPrice();
    }

    get totalPrize() {
        return this.#totalPrize;
    }

    get lottoResults() {
        return this.#lottoResult.resultMap;
    }

    #checkMatches(prizeLotto, bonusNum) {
        this.#lottos.forEach(lotto => {
            const matchedCount = lotto.filter(number => prizeLotto.includes(number)).length;
            const hasBonus = lotto.some(number => number === bonusNum);
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