import Lotto from "./lotto.js";

class LottoMachine {
    static MINIMUM_PRICE_MESSAGE = "금액은 1000원 이상이여야 합니다.";
    static LOTTO_PRICE = 1000;

    constructor(price) {
        this.#confirmMinimumPrice(price);
        this.lottos = this.#createLotto(this.#calculateLottoNum(price));
    }

    #createLotto(lottoNum) {
        return Array.from({ length: lottoNum }, () => new Lotto());
    }

    #confirmMinimumPrice(price) {
        if (price < LottoMachine.LOTTO_PRICE) {
            throw new Error(LottoMachine.MINIMUM_PRICE_MESSAGE);
        }
    }

    #calculateLottoNum(price) {
        return price / LottoMachine.LOTTO_PRICE;
    }
}

export default LottoMachine;