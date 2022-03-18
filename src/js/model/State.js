import PriceModel from './PriceModel.js';
import LottoModel from './LottoModel.js';

export default class State {
  #priceModel;
  #lottoModel;

  constructor() {
    this.#priceModel = new PriceModel();
  }

  generateLotto() {
    this.#lottoModel = new LottoModel();
  }

  get priceModel() {
    return this.#priceModel;
  }

  get lottoModel() {
    return this.#lottoModel;
  }
}
