import { $ } from '../utils/utils.js';
import View from './View.js';

export default class PurchaseFormSection extends View {
  constructor(el) {
    super(el);
    this.$inputPrice = $('#price');

    this.bindEvents();
  }

  init() {
    this.$inputPrice.value = '';
  }

  bindEvents() {
    this.$target.addEventListener('submit', (e) => this.onSubmitPrice(e));
  }

  onSubmitPrice(e) {
    e.preventDefault();
    this.emit('@submitPrice', new FormData(this.$target));
  }
}
