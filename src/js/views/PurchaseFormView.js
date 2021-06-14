import View from './View.js';
import { $, $$ } from '../utils/utils.js';

export default class PurchaseFormView extends View {
  constructor(el) {
    super(el);
    this.$purchaseFormInput = $('#purchase-form-input');
    this.bindEvents();
  }

  init() {
    this.$purchaseFormInput.value = '';
  }

  bindEvents() {
    this.el.addEventListener('submit', (e) => this.onSubmitPurchaseMoney(e));
  }

  onSubmitPurchaseMoney(e) {
    e.preventDefault();
    this.emit('@submitMoney', new FormData(this.el));
  }
}
