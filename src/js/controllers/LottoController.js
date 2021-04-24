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
        this.inputLottoNumsView.hide().reset();
    }

    renderPurchaseResult() {
        this.purchasedLottosView.show().reset().renderLottos(this.lottoModel.lottos);
        this.inputLottoNumsView.show();
    }

    attachEvent() {
        this.inputPriceView.on('submitPrice', ({ detail: price }) => this.inputPrice(price));
        this.inputLottoNumsView.on('submitLottoNums', ({ detail: nums }) => this.inputLottoNums(nums));
    }

    inputPrice(price) {
        this.lottoModel.purchasedPrice = price;
        this.lottoModel.lottos = price;
        this.renderPurchaseResult();
    }

    inputLottoNums(nums) {
        console.log(this.lottoModel.lottos);
        console.log(nums);
    }
}

export default LottoController
