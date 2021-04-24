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
        this.purchasedLottosView.hide();
        this.inputLottoNumsView.hide();
    }

    attachEvent() {
        this.inputPriceView.on('submitPrice', ({ detail: price }) => this.buyLottos(price));
    }

    buyLottos(price) {
        this.lottoModel.lottos = price;
    }
}

export default LottoController
