import View from './View.js';
import { getEl } from '../utils.js';
import { lottoTemplate } from '../templates.js';

class PurchasedLottosView extends View {
    constructor(targetEl) {
        super(targetEl);
    }

    init() {

    }

    renderLottos(lottos) {
        getEl('#total-purchased', this.targetEl).innerText = lottos.length;
        getEl('#lotto-icons', this.targetEl).innerHTML = lottos.map(lotto => lottoTemplate(lotto)).join('');
    }
}

export default PurchasedLottosView
