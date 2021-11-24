import { DOM_ID, LOTTO_LENGTH } from '../constants.js';
import el from '../dom.js';
import { $, $$ } from '../utils.js';

import View from './view.js';

export default class SelfLottoForm extends View {
  constructor() {
    super();
    this.$selfLottoList = $(DOM_ID.SELF_LOTTO_LIST);
    this.$autoGenerateButton = $(DOM_ID.AUTO_GENERATE_BUTTON);
    this.$selfLottoInputContainer = $$(DOM_ID.SELF_LOTTO_INPUT_CONTAINER);
  }

  createSelfLottoForm(amount) {
    for (let i = 0; i < amount; i += 1) {
      this.$selfLottoList.insertAdjacentElement(
        'afterbegin',
        el(
          '<div id="selfLottoInputContainer">',
          Array.from({ length: LOTTO_LENGTH }, () => '<input type="number" class="self-number mx-1 text-center"/>'),
        ),
      );
    }
    this.updateLottoInputDom();
  }

  bindOnClickSelfGenerateButton(handler) {
    this.$autoGenerateButton.addEventListener('click', () => {
      handler();
    });
  }

  updateLottoInputDom() {
    this.$selfLottoInputContainer = $$(DOM_ID.SELF_LOTTO_INPUT_CONTAINER);
  }

  init() {
    while (this.$selfLottoList.firstChild) {
      if (this.$selfLottoList.firstChild === this.$autoGenerateButton) return;
      this.$selfLottoList.removeChild(this.$selfLottoList.firstChild);
    }
  }
}
