import { getEl, getEls } from '../utils.js';

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
        if (target.value.length < 2) return;
        const { indexNum } = target.dataset;
        const nextIndexNum = +indexNum + 1;
        if (nextIndexNum > 6) return;
        getEl(`.winning-number[data-index-num="${nextIndexNum}"]`).focus();
    }


    inputLottoNumsHnadler(e) {
        e.preventDefault();
        const lottoNums = new Set();
        this.inputEls.forEach(el => lottoNums.add(+el.value));
        if (lottoNums.size < 7) return alert('로또 번호에는 중복된 숫자를 입력할 수 없습니다.');
        this.emit('submitNums', [...lottoNums]);
    }
}

export default InputLottoNumsView
