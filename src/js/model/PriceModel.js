const PRICE_FORM__INPUT = 'price-form__input';
import { ERR_MESSAGE } from '../constants/alertMessage.js';
import LottoModel from './LottoModel.js';
export default class PriceModel {
  #price;

  constructor() {
    this.resetPrice();
  }

  eventHandler = {
    PURCHASE: () => {
      const inputPrice = document.querySelector('.price-form__input').value;
      if (inputPrice === '') {
        return alert(ERR_MESSAGE.NONE_PRICE);
      }
      if (inputPrice < 1000) {
        return alert(ERR_MESSAGE.LESS_THAN_ENOUGH);
      }
      if (inputPrice > 100000) {
        return alert(ERR_MESSAGE.GREATER_THAN_ENOUGH);
      }
      if (!!inputPrice % 10000) {
        return alert(ERR_MESSAGE.NOT_VALID_PRICE);
      }
      this.generateLotto();
    },
  };

  generateLotto() {
    const quantity = this.#price / 10000;
    return new LottoModel(quantity);
  }

  updatePrice(newPrice) {
    this.#price = newPrice;
  }

  resetPrice() {
    this.#price = '';
  }

  getPrice() {
    return this.#price;
  }
}
