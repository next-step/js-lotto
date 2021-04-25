import { getEl, getEls } from '../utils.js';

import View from './View.js';

class ResultModalView extends View {
    constructor(targetEl) {
        super(targetEl);
        this.countEls = getEls('.match-count');
        this.init();
    }

    init() {
        this.targetEl.addEventListener('click', this.clickDelegationHandler.bind(this));
    }

    reset() {
        this.hide();
        return this;
    }

    show() {
        this.targetEl.classList.add('open');
        return this;
    }

    hide() {
        this.targetEl.classList.remove('open');
        return this;
    }

    clickDelegationHandler({ target }) {
        if (target.closest('.modal-close') || !target.closest('.modal-inner')) return this.hide();
        if (target.id === 'reset-btn') return this.restartClickHandler();
    }

    renderResult(winLottos, earningRate) {
        getEls('.match-count').forEach(el => el.innerText = winLottos.get(el.dataset.count) ?? 0);
        getEl('#profit').innerText = earningRate;
    }

    restartClickHandler() {
        this.emit('restartLottoGame');
    }
}

export default ResultModalView
