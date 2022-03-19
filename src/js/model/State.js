import PriceModel from './PriceModel.js';
import LottoModel from './LottoModel.js';

import { LOTTO_PAY_UNIT } from '../constants/unit.js';
import { PRICE_FORM__INPUT } from '../constants/selectTarget.js';

export default class State {
  #priceModel;
  #lottoModel;

  constructor() {
    this.#priceModel = new PriceModel();
  }

  eventHandler = {
    PURCHASE: (e) => {
      e.preventDefault();
      const inputPrice = Number(document.querySelector(`.${PRICE_FORM__INPUT}`).value);
      if (!PriceModel.validators.isValidPrice(inputPrice)) return;
      this.#priceModel.updatePrice(inputPrice);
      this.generateLotto(inputPrice);
    },
  };

  generateLotto(price) {
    const quantity = price / LOTTO_PAY_UNIT;
    if (!this.#lottoModel) {
      this.#lottoModel = new LottoModel(quantity);
      return;
    }
    this.#lottoModel.addLotto(quantity);
  }

  get priceModel() {
    return this.#priceModel;
  }

  get lottoModel() {
    return this.#lottoModel;
  }
}
