import { getEl, getEls } from '../utils.js';
import { NUMBERS, CUSTOM_EVENT, MESSAGES } from '../constants.js';

import View from './View.js';

class InputLottoNumsView extends View {
    constructor(targetEl) {
        super(targetEl);
        this.inputEls = getEls('.winning-number');
        this.init();
    }

    init() {
        getEl('#input-lotto-nums').addEventListener('keyup', this.inputLottoNumHandler.bind(this));
        getEl('#input-lotto-nums').addEventListener('submit', e => this.inputLottoNumsHnadler(e));
    }

    reset() {
        this.inputEls.forEach(el => el.value = '');
        return this;
    }

    inputLottoNumHandler({ target }) {
        const MAX_LENGTH = 2;
        if (target.value.length < MAX_LENGTH) return;
        const { indexNum } = target.dataset;
        const nextIndexNum = +indexNum + 1;
        if (nextIndexNum > NUMBERS.LOTTO_SIZE) return;
        getEl(`.winning-number[data-index-num="${nextIndexNum}"]`).focus();
    }

    inputLottoNumsHnadler(e) {
        e.preventDefault();
        const lottoNums = new Set();
        this.inputEls.forEach(el => lottoNums.add(+el.value));
        if (lottoNums.size < NUMBERS.WINNING_LOTTO_SIZE) return alert(MESSAGES.INVALID_NUMS);
        this.emit(CUSTOM_EVENT.SUBMIT_NUMS, [...lottoNums]);
    }
}

export default InputLottoNumsView
