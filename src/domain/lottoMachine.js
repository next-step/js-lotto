import Lotto from "./Lotto.js";

class LottoMachine {
    static MINIMUM_PRICE_MESSAGE = "금액은 1000원 이상이여야 합니다.";
    static MANUAL_LOTTO_SIZE_MESSAGE = "장 구매하실 수 있습니다.";
    static LOTTO_PRICE = 1000;

    #lottos;
    #lottoNum;

    constructor(price) {
        this.#confirmMinimumPrice(price);
        this.#lottoNum = this.#calculateLottoNum(price);
    }

    buyAuto() {
        this.#lottos = this.#createAutoLotto();
    }

    buyManual(lottos) {
        this.#confirmManualLottoLength(lottos);
        this.#lottos = lottos;
    }

    get getLottoNum() {
        return this.#lottoNum;
    }

    get getLottos() {
        return this.#lottos;
    }

    #createAutoLotto() {
        return Array.from({ length: this.#lottoNum }, () => new Lotto(this.#outputAutoLotto()));
    }

    #confirmMinimumPrice(price) {
        if (price < LottoMachine.LOTTO_PRICE) {
            throw new Error(LottoMachine.MINIMUM_PRICE_MESSAGE);
        }
    }

    #confirmManualLottoLength(lottos) {
        if (lottos.length !== this.#lottoNum) {
            throw new Error(this.#lottoNum + LottoMachine.MANUAL_LOTTO_SIZE_MESSAGE);
        }
    }

    #calculateLottoNum(price) {
        return price / LottoMachine.LOTTO_PRICE
    }

    #outputAutoLotto() {
        const numberRange = [...Array(Lotto.LOTTO_NUMBER_RANGE).keys()].map(i => i + 1);
        
        this.#shuffleArray(numberRange);
        
        return numberRange.slice(0, Lotto.LOTTO_SIZE).sort((a, b) => a - b);
    }

    #shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    }
}

export default LottoMachine;