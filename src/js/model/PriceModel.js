import { PRICE_FORM__INPUT } from '../constants/selectTarget.js';
export default class PriceModel {
  #price;

  constructor() {
    this.resetPrice();
  }

  updatePrice(newPrice) {
    this.#price = newPrice;
    document.querySelector(`.${PRICE_FORM__INPUT}`).value = '';
  }

  resetPrice() {
    this.#price = '';
  }

  getPrice() {
    return this.#price;
  }
}
