import { CUSTOM_EVENT, EVENT } from '@step3/constants/event';
import { SELECTOR_NAME } from '@step3/constants/selector';

import { View } from '@step3/view';

export default class LottoPurchaseFormView extends View<HTMLFormElement> {
  private $inputPriceLabel: HTMLLabelElement;

  private $inputPriceInput: HTMLInputElement;

  constructor($element: HTMLFormElement) {
    super($element);
    this.initElement();
    this.init();
    this.setEvent();
  }

  protected init() {
    this.$element.reset();
    this.$inputPriceLabel.focus();
  }

  protected setEvent() {
    this.$element.addEventListener(EVENT.SUBMIT, (event) => this.handleActionSubmitInputPrice(event));
  }

  protected initElement() {
    this.$inputPriceLabel = this.$element.querySelector<HTMLLabelElement>(SELECTOR_NAME.INPUT_PRICE.LABEL);
    this.$inputPriceInput = this.$element.querySelector<HTMLInputElement>(SELECTOR_NAME.INPUT_PRICE.INPUT);
  }

  private handleActionSubmitInputPrice = (event: Event) => {
    event.preventDefault();
    const amount = this.$inputPriceInput.value;
    this.emit(CUSTOM_EVENT.SUBMIT_PURCHASE_AMOUNT, Number(amount));
    this.$element.reset();
  };
}
