import { LOTTO_PAY_UNIT } from '../constants/unit.js';
import LottoModel from './LottoModel.js';

export default class PriceModel {
  #price;
  #isLottoIssued;

  constructor() {
    this.#isLottoIssued = false;
    this.resetPrice();
  }

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
