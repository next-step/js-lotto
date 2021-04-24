import View from './View.js';
import { getEl, getEls } from '../utils.js';
import { lottoTemplate } from '../templates.js';

class PurchasedLottosView extends View {
    constructor(targetEl) {
        super(targetEl);
        this.init();
    }

    init() {
        getEl('#lotto-switch').addEventListener('change', this.changeSwitchHandler.bind(this));
    }

    reset() {
        getEl('#lotto-switch').checked = false;
        this.showLottoIcons();
    }

    changeSwitchHandler({ target: { checked } }) {
        if (checked) return this.showLottoDetails();
        this.showLottoIcons();
    }

    showLottoIcons() {
        getEl('#lotto-icons').classList.remove('flex-col');
        getEls('.lotto-detail').forEach(el => el.style.display = 'none');
    }

    showLottoDetails() {
        getEl('#lotto-icons').classList.add('flex-col');
        getEls('.lotto-detail').forEach(el => el.style.display = 'inline');
    }

    renderLottos(lottos) {
        getEl('#total-purchased', this.targetEl).innerText = lottos.length;
        getEl('#lotto-icons', this.targetEl).innerHTML = lottos.map(lotto => lottoTemplate(lotto)).join('');
        return this;
    }
}

export default PurchasedLottosView
