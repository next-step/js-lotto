import { generateLottoNum } from '../utils.js';

class LottoModel {
    constructor() {
        this.purchasedPrice = 0;
        this.lottos = [];
        this.winLottos = new Map();
        this.earningRate = 0;
    }

    get purchasedPrice() {
        return this._purchasedPrice;
    }

    set purchasedPrice(purchasedPrice) {
        this._purchasedPrice = purchasedPrice;
    }

    get lottos() {
        return this._lottos;
    }

    set lottos(price) {
        const count = price / 1000;
        this._lottos = Array.from({ length: count }, () => generateLottoNum());
    }

    get winLottos() {
        return this._winLottos;
    }

    set winLottos(winLottos) {
        this._winLottos = winLottos;
    }

    get earningRate() {
        return this._earningRate;
    }

    set earningRate(earningRate) {
        this._earningRate = earningRate;
    }
}

export default LottoModel
