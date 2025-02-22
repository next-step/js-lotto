import Lotto from "./Lotto.js";

class LottoMachine {
    static MINIMUM_PRICE_MESSAGE = "금액은 1000원 이상이여야 합니다.";
    static MANUAL_LOTTO_SIZE_MESSAGE = "장 구매하실 수 있습니다.";
    static LOTTO_PRICE = 1000;

    #numberRange
    #lottos;
    #lottoNum;

    constructor(price) {
        this.#validateMinimumPrice(price);
        this.#lottoNum = this.#calculateLottoNum(price);
        this.#numberRange = [...Array(Lotto.LOTTO_NUMBER_RANGE).keys()].map(i => i + 1);
    }

    buyAuto() {
        this.#lottos = this.#createAutoLotto();
    }

    buyManual(lottos) {
        this.#validateManualLottoLength(lottos);
        this.#lottos = lottos;
    }

    get lottoNum() {
        return this.#lottoNum;
    }

    get lottos() {
        return this.#lottos.map(lotto => lotto.value);
    }

    #createAutoLotto() {
        return Array.from({ length: this.#lottoNum }, () => new Lotto(this.#outputAutoLotto()));
    }

    #validateMinimumPrice(price) {
        if (price < LottoMachine.LOTTO_PRICE) {
            throw new Error(LottoMachine.MINIMUM_PRICE_MESSAGE);
        }
    }

    #validateManualLottoLength(lottos) {
        if (lottos.length !== this.#lottoNum) {
            throw new Error(this.#lottoNum + LottoMachine.MANUAL_LOTTO_SIZE_MESSAGE);
        }
    }

    #calculateLottoNum(price) {
        return price / LottoMachine.LOTTO_PRICE
    }

    #outputAutoLotto() {
        this.#shuffleArray(this.#numberRange);
        return this.#numberRange.slice(0, Lotto.LOTTO_SIZE).sort((a, b) => a - b);
    }

    #shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

export default LottoMachine;