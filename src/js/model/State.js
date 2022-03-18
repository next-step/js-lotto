import PriceModel from './PriceModel.js';
import LottoModel from './LottoModel.js';

import { PRICE_FORM, PRICE_FORM__INPUT, PRICE_FORM__BUTTON } from '../constants/selectTarget.js';

// unit
const LOTTO_PAY_UNIT = 1000;
// message
import { ERR_MESSAGE } from '../constants/alertMessage.js';

export default class State {
  #priceModel;
  #lottoModel;

  constructor() {
    this.#priceModel = new PriceModel();
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

      this.#priceModel.updatePrice(inputPrice);
      this.#lottoModel = this.#priceModel.generateLotto();
    },
  };

  get priceModel() {
    return this.#priceModel;
  }

  get lottoModel() {
    return this.#lottoModel;
  }
}
