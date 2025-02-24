import LottoResult from "./LottoResult.js";
import LottoMachine from "./LottoMachine.js";

class LottoConfirmation {

    static THREE_MATCH_PRICE = 5_000;
    static FOUR_MATCH_PRICE = 50_000;
    static FIVE_MATCH_PRICE = 1_500_000;
    static FIVE_BONUS_MATCH_PRICE = 30_000_000;
    static SIX_MATCH_PRICE = 2_000_000_000;

    #lottos;
    #totalPrize;
    #lottoResult;

    constructor(lottos, prizeLotto) {
        this.#lottos = lottos;
        this.#totalPrize = 0;
        this.#lottoResult = new LottoResult();

        this.#checkMatches(prizeLotto);
        this.#calculateTotalPrice();
    }

    get totalPrize() {
        return this.#totalPrize;
    }

    get lottoResults() {
        return this.#lottoResult.resultMap;
    }

    calculateRateOfReturn() {
        const price = this.#lottos.length * LottoMachine.LOTTO_PRICE;
        return (this.#totalPrize / price) * 100;
    }

    #checkMatches(prizeLotto) {
        this.#lottos.forEach(lotto => {
            this.#lottoResult.addResult(
                lotto.checkMatches(prizeLotto.value),
                lotto.checkBonus(prizeLotto.bonusNumber)
            );
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
}

export default LottoConfirmation;