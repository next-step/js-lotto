import { $ } from '../utils/dom';

export class InputPriceFormView {
  inputPriceForm;
  inputPrice;
  inputPriceBtn;

  constructor() {
    this.inputPriceForm = $('.input-price-form');
    this.inputPrice = $('.input-price');
    this.inputPriceBtn = $('.input-price-btn');
  }

  getPurchaseAmount() {
    const purchaseAmount = this.inputPrice.value;
    this.inputPrice.value = '';

    return purchaseAmount;
  }
}
