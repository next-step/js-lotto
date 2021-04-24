import { getEl } from '../utils.js';
import InputPriceView from '../views/InputPriceView.js';
import PurchasedLottosView from '../views/PurchasedLottosView.js';
import InputLottoNumsView from '../views/InputLottoNumsView.js';
import LottoModel from '../models/LottoModel.js';

class LottoController {
    constructor() {
        this.inputPriceView = new InputPriceView(getEl('#input-price-form'));
        this.purchasedLottosView = new PurchasedLottosView(getEl('#purchased-lottos'));
        this.inputLottoNumsView = new InputLottoNumsView(getEl('#input-lotto-nums'));
        this.lottoModel = new LottoModel();
        this.init();
    }

    init() {
        this.reset();
        this.attachEvent();
    }

    reset() {
        this.inputPriceView.reset();
        this.purchasedLottosView.hide().reset();
        this.inputLottoNumsView.hide();
    }

    renderPurchaseResult() {
        this.purchasedLottosView.show().renderLottos(this.lottoModel.lottos).reset();
        this.inputLottoNumsView.show();
    }

    attachEvent() {
        this.inputPriceView.on('submitPrice', ({ detail: price }) => this.purchaseLottos(price));
    }

    purchaseLottos(price) {
        this.lottoModel.purchasedPrice = price;
        this.lottoModel.lottos = price;
        this.renderPurchaseResult();
    }
}

export default LottoController
