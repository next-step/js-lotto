import { EVENT, SELECTOR } from '../constants/dom.js';
import { $ } from '../utils/index.js';
import { View } from './View.js';

export class PurchaseView extends View {
  $input;

  $button;

  constructor() {
    super(SELECTOR.PURCHASE_FORM);
    this.$button = $(SELECTOR.PURCHASE_BUTTON);
    this.$input = $(SELECTOR.PURCHASE_INPUT);
  }

  bindPurchaseSubmitEvent(handler) {
    this.$element.addEventListener(EVENT.SUBMIT, (e) => {
      e.preventDefault();
      handler(this.$input.value);
    });
  }

  reset() {
    this.$input.value = '';
  }
}
