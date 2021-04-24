import View from './View.js';
import { getEl } from '../utils.js';

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
        getEl('#input-price', this.target).focus();
    }

    inputPriceHandler(e) {
        e.preventDefault();
        this.emit('submitPrice', e.target.elements.price.value);
    }
}

export default InputPriceView
