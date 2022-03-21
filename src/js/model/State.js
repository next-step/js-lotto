import PriceModel from './PriceModel.js';
import LottoModel from './LottoModel.js';

import { LOTTO_PURCHASE_UNIT } from '../constants/unit.js';
import { PRICE_FORM__INPUT, LOTTO_SECTION } from '../constants/selectTarget.js';
import { $ } from '../util/dom.js';

export default class State {
  #priceModel;
  #lottoModel;

  constructor() {
    this.#priceModel = new PriceModel();
  }

  eventHandler = {
    purchaseLotto: (e) => {
      try {
        e.preventDefault();
        const inputPrice = Number($(PRICE_FORM__INPUT).value);
        debugger;
        PriceModel.validators.isValidPrice(inputPrice);
        this.#priceModel.updatePrice(inputPrice);
        this.generateLotto(inputPrice);
      } catch (err) {
        alert(err.message);
      }
    },
    toggleDisplayLottoNumbers: () => {
      const isPriceToggled = $(`${LOTTO_SECTION} input`).checked;

      if (isPriceToggled) {
        this.#lottoModel.showLottoTicketsNumbers();
        return;
      }

      this.#lottoModel.hideLottoTicketsNumbers();
    },
  };

  generateLotto(price) {
    try {
      const quantity = price / LOTTO_PURCHASE_UNIT;
      const totalQuantity = this.#lottoModel?.quantity + quantity;
      LottoModel.validators.isValidQuantity(totalQuantity);

        if (this.#lottoModel) {
          this.#lottoModel.addLotto(quantity);
          return;
        }

      this.#lottoModel = new LottoModel(quantity);
    } catch (e) {
      alert(e.message);
    }
  }

  get priceModel() {
    return this.#priceModel;
  }

  get lottoModel() {
    return this.#lottoModel;
  }
}
