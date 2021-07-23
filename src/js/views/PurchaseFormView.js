import { on, qs } from '../util/helper.js';
import View from './View.js';

export default class PurchaseFormView extends View {
  constructor() {
    super(qs('#purchase-price-input-form'));

    this.inputElement = qs('[type=number]', this.element);
    this.bindEvent();
  }
  bindEvent() {
    on(this.element, 'submit', (event) => this.handleSubmit(event));
  }

  resetInputPrice() {
    this.element.reset();
    this.inputElement.focus();
  }

  handleSubmit(event) {
    event.preventDefault();

    const purchasePrice = this.inputElement.value;

    this.emit('@submit', { purchasePrice });
  }
}
