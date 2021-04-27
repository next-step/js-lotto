'use strict';

import { $ } from '../utils/dom.js';

class LottoNumberInput {
  constructor() {
    this.$lottoNumberSection = $('#lotto-number-section');
    this.$modalButton = $('.open-result-modal-button');
    this.$modalButton.addEventListener('click', this.onClickModalButton);
  }

  init() {
    this.$lottoNumberSection.style.display = 'block';
  }

  setRenderResultModal(renderResultModal) {
    this.renderResultModal = renderResultModal;
  }

  onClickModalButton = () => {
    console.log('onClickModalButton');
    this.renderResultModal && this.renderResultModal();
  };
}

export default LottoNumberInput;
