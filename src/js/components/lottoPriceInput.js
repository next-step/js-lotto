'use strict';

import { $ } from '../utils/dom.js';
import { isEmpty, isValidPrice } from '../utils/validator.js';
import { message } from '../utils/messages.js';
import { UNIT } from '../utils/constants.js';

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
      alert(message.PRICE_INPUT);
      return;
    }
    if (!isValidPrice(this.$lottoPriceInput)) {
      alert(message.PRICE_UNIT);
      return;
    }

    const numberOfLotto = this.$lottoPriceInput.value / UNIT;
    this.renderLottoList && this.renderLottoList(numberOfLotto);
    this.$lottoPriceInput.readOnly = true;
  };
}

export default LottoPriceInput;
