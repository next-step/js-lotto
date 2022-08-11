import View from './View.js';
import { $ } from '../utils.js';

export class InputFormView extends View {
  constructor() {
    super($('#purchase-lotto'));
    this.inputElement = $('#purchase-lotto__input');
    this.buttonElement = $('#purchase-lotto__button');
    this.bindEvents();
  }

  bindEvents() {
    this.on('submit', (event) => this.#purchaseLotto(event));
  }

  #purchaseLotto(event) {
    event.preventDefault();
    const { value } = this.inputElement;
    this.emit('@submit', { value });
  }

  #removeInputValue() {
    this.inputElement.value = '';
  }

  show(lottoNumbers = []) {
    const lottoQuantity = lottoNumbers.length;
    if (!lottoQuantity) return this.#removeInputValue();
  }
}
