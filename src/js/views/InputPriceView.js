import { getEl } from '../utils.js';
import { NUMBERS, CUSTOM_EVENT, MESSAGES } from '../constants.js';

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
        const purchasedPrice = e.target.elements.price.value;
        if (purchasedPrice % NUMBERS.UNIT) {
            alert(MESSAGES.INVALID_PRICE);
            return this.reset();
        }
        this.emit(CUSTOM_EVENT.SUBMIT_PRICE, purchasedPrice);
    }
}

export default InputPriceView
