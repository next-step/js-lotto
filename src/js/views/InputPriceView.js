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
        const purchasedPrice = e.target.elements.price.value;
        if (purchasedPrice % 1000) {
            alert('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
            return this.reset();
        }
        this.emit('submitPurchasedPrice', purchasedPrice);
    }
}

export default InputPriceView
