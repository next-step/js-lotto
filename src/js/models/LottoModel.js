import { generateLottoNumber, checkLottos } from '../utils.js';

class LottoModel {
    constructor() {
        this.purchasedPrice = 0;
        this.lottos = [];
        this.winLottos = null;
    }

    reset() {
        this.purchasedPrice = 0;
        this.lottos = [];
        this.winLottos = null;
    }

    get purchasedPrice() {
        return _purchasedPrice;
    }

    set purchasedPrice(price) {
        this._purchasedPrice = price;
    }

    get lottos() {
        return this._lottos;
    }

    set lottos(price) {
        const count = price / 1000;
        this._lottos = Array.from({ length: count }, () => generateLottoNumber());
    }

    get winLottos() {
        return _winLottos;
    }

    set winLottos(lottoNums) {
        if (!lottoNums) return;
        this._winLottos = checkLottos(this.lottos, lottoNums);
    }
}

export default LottoModel
