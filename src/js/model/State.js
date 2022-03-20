import PriceModel from './PriceModel.js';
import LottoModel from './LottoModel.js';

import { LOTTO_PURCHASE_UNIT, LOTTO_PURCHASE_MAX_QUANTITY } from '../constants/unit.js';
import { PRICE_FORM__INPUT, LOTTO_SECTION } from '../constants/selectTarget.js';

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
    SHOW_NUMBERS: () => {
      const isChecked = document.querySelector(`.${LOTTO_SECTION} input`).checked;
      if (isChecked) {
        this.#lottoModel.showLottoTicketsNumbers();
        return;
      }
      this.#lottoModel.hideLottoTicketsNumbers();
    },
  };

  generateLotto(price) {
    const quantity = price / LOTTO_PURCHASE_UNIT;
    const totalQuantity = this.#lottoModel?.quantity + quantity;

    if (!LottoModel.validators.isValidQuantity(totalQuantity)) return;
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
