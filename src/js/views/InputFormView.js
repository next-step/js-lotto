import View from './View.js';
import { $ } from '../utils.js';

export default class InputFormView extends View {
  constructor() {
    super($('#form-purchase-lotto'));
    this.inputElement = $('#input-purchase-lotto');
    this.buttonElement = $('#button-purchase-lotto');
    this.bindEvents();
  }

  bindEvents() {
    this.on('submit', (event) => this.purchaseLotto(event));
    this.on('click', (event) => this.purchaseLotto(event));
  }

  purchaseLotto(event) {
    event.preventDefault();
    const { value } = this.inputElement;
    this.emit('@submit', { value });
  }
}
