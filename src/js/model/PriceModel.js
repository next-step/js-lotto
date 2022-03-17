// class
const PRICE_FORM__INPUT = 'price-form__input';
// unit
const LOTTO_PAY_UNIT = 1000;
// message
import { ERR_MESSAGE } from '../constants/alertMessage.js';

import LottoModel from './LottoModel.js';
export default class PriceModel {
  #price;

  constructor() {
    this.resetPrice();
  }

  eventHandler = {
    PURCHASE: () => {
      const inputPrice = Number(
        document.querySelector('.price-form__input').value
      );
      if (inputPrice === '') {
        return alert(ERR_MESSAGE.NONE_PRICE);
      }
      if (inputPrice < LOTTO_PAY_UNIT) {
        return alert(ERR_MESSAGE.LESS_THAN_ENOUGH);
      }
      if (inputPrice > 100000) {
        return alert(ERR_MESSAGE.GREATER_THAN_ENOUGH);
      }
      if (!!(inputPrice % LOTTO_PAY_UNIT)) {
        return alert(ERR_MESSAGE.NOT_VALID_PRICE);
      }
      this.generateLotto();
    },
  };

  generateLotto() {
    const quantity = this.#price / LOTTO_PAY_UNIT;
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
