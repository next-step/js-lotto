'use strict';

import { $ } from '../utils/dom.js';
import { isEmpty, isValidPrice } from '../utils/validator.js';

class LottoPriceInput {
  constructor() {
    this.$lottoPriceSection = $('#lotto-price-section');
    this.$lottoPriceInput = $('#lotto-price-input');
    this.$lottoPriceSection.addEventListener('keyup', this.handlePriceSubmit);
    this.$lottoPriceSection.addEventListener('click', this.handlePriceSubmit);
  }

  setRenderLottoList(renderLottoList) {
    this.renderLottoList = renderLottoList;
  }

  handlePriceSubmit = event => {
    if (!(event.key === 'Enter' || event.target.matches('.btn'))) return;
    if (isEmpty(this.$lottoPriceInput)) {
      alert('금액을 입력해주세요.');
      return;
    }
    if (!isValidPrice(this.$lottoPriceInput)) {
      alert('천원단위로 입력해주세요.');
      return;
    }
    const numberOfLotto = this.$lottoPriceInput.value / 1000;
    this.renderLottoList && this.renderLottoList(numberOfLotto);
    this.$lottoPriceInput.readOnly = true;
  };
}

export default LottoPriceInput;
