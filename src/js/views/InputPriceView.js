import { getEl } from '../utils.js';

import View from './View.js';

class InputPriceView extends View {
    constructor(targetEl) {
        super(targetEl);
        this.init();
    }

    init() {
        this.targetEl.addEventListener('submit', e => this.inputPriceHandler(e));
    }

    reset() {
        this.targetEl.reset();
        getEl('#input-price').focus();
        return this;
    }

    inputPriceHandler(e) {
        e.preventDefault();
        this.emit('submitPurchasedPrice', e.target.elements.price.value);
    }
}

export default InputPriceView
