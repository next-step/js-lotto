import ResultCountItem from "./ResultCountItem.js";

class LottoResultItem {

    #rateOfReturn
    #items;
    #prizeMap;

    constructor(lottoConfirmation) {
        this.#prizeMap = this.#initPrizeMap();
        this.#rateOfReturn = lottoConfirmation.calculateRateOfReturn();
        this.#createLottoResultItems(lottoConfirmation.lottoResults);
    }

    get items() {
        return this.#items;
    }

    get rateOfReturn() {
        return this.#rateOfReturn;
    }

    #initPrizeMap() {
        return new Map([
            [3, 5000],
            [4, 50000],
            [5, 1500000],
            ["5+보너스볼", 30000000],
            [6, 3000000000]
        ]);
    }

    #createLottoResultItems(lottoResults) {
        this.#items = [];
        for (const [count, prize] of this.#prizeMap) {
            this.#items.push(
                new ResultCountItem(
                    count,
                    prize,
                    lottoResults.get(count) || 0
                )
            );
        }
    }

}

export default LottoResultItem;