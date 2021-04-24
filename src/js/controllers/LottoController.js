import { getEl, checkLottos, calcEarningRate } from '../utils.js';

import InputPriceView from '../views/InputPriceView.js';
import PurchasedLottosView from '../views/PurchasedLottosView.js';
import InputLottoNumsView from '../views/InputLottoNumsView.js';
import ResultModalView from '../views/ResultModalView.js';
import LottoModel from '../models/LottoModel.js';

class LottoController {
    constructor() {
        this.inputPriceView = new InputPriceView(getEl('#input-price-form'));
        this.purchasedLottosView = new PurchasedLottosView(getEl('#purchased-lottos'));
        this.inputLottoNumsView = new InputLottoNumsView(getEl('#input-lotto-nums'));
        this.resultModalView = new ResultModalView(getEl('section.modal'));
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
        this.resultModalView.reset();
    }

    renderPurchaseResult() {
        const { lottos } = this.lottoModel;
        this.purchasedLottosView.show().reset().renderLottos(lottos);
        this.inputLottoNumsView.show();
    }

    renderResultModal() {
        const { winLottos, earningRate } = this.lottoModel;
        this.resultModalView.show().renderResult(winLottos, earningRate);
    }

    attachEvent() {
        this.inputPriceView.on('submitPrice', ({ detail: price }) => this.inputPrice(price));
        this.inputLottoNumsView.on('submitNums', ({ detail: nums }) => this.inputLottoNums(nums));
        this.resultModalView.on('restart', this.reset.bind(this));
    }

    inputPrice(price) {
        this.lottoModel.purchasedPrice = price;
        this.lottoModel.lottos = price;
        this.renderPurchaseResult();
    }

    inputLottoNums(lottoNums) {
        const { lottos, purchasedPrice } = this.lottoModel;
        this.lottoModel.winLottos = checkLottos(lottos, lottoNums);
        this.lottoModel.earningRate = calcEarningRate(purchasedPrice, this.lottoModel.winLottos);
        this.renderResultModal();
    }
}

export default LottoController
