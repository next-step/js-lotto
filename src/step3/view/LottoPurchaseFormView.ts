import { CUSTOM_EVENT, EVENT } from '@step3/constants/event';
import { SEMANTIC_TAG } from '@step3/constants/semanticTag';
import { View } from '@step3/view';

export default class LottoPurchaseFormView extends View<HTMLFormElement> {
  constructor($element: HTMLFormElement) {
    super($element);
    this.init();
    this.setEvent();
  }

  protected init() {
    this.$element.reset();
    const labelNode = this.$element.querySelector(SEMANTIC_TAG.LABEL);
    labelNode.focus();
  }

  protected setEvent() {
    this.$element.addEventListener(EVENT.SUBMIT, (event) => this.handleOnSubmit(event));
  }

  private handleOnSubmit = (event: Event) => {
    event.preventDefault();
    const amount = this.$element.querySelector(SEMANTIC_TAG.INPUT).value;
    this.emit(CUSTOM_EVENT.SUBMIT_PURCHASE_AMOUNT, Number(amount));
    this.$element.querySelector(SEMANTIC_TAG.INPUT).value = null;
  };
}
