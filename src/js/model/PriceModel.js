import { PRICE_FORM, PRICE_FORM__INPUT, PRICE_FORM__BUTTON } from '../constants/selectTarget.js';

// unit
const LOTTO_PAY_UNIT = 1000;
// message
import { ERR_MESSAGE } from '../constants/alertMessage.js';

import LottoModel from './LottoModel.js';
export default class PriceModel {
  #price;
  #isLottoIssued;

  constructor() {
    this.#isLottoIssued = false;
    this.resetPrice();
  }

  eventHandler = {
    PURCHASE: () => {
      const inputPrice = Number(document.querySelector(`.${PRICE_FORM__INPUT}`).value);
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

      this.updatePrice(inputPrice);
      this.generateLotto();
    },
    //
  };

  generateLotto() {
    this.#isLottoIssued = true;
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
