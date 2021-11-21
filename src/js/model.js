import {ERROR_MESSAGE, LOTTO_LENGTH, LOTTO_MAX_NUMBER, LOTTO_PRICE} from './constants.js';

export default class Model {
  constructor() {
    this.initData();
  }

  initData() {
    this.data = { amount: 0, lottos: [] };
  }

  setAmount(money) {
    if (money % LOTTO_PRICE !== 0) throw Error(ERROR_MESSAGE.UNIT_PRICE)
    if (money < LOTTO_PRICE) throw Error(ERROR_MESSAGE.MIN_PRICE);
    this.data.amount = Math.floor(money / LOTTO_PRICE);
    return this.data.amount;
  }

  setLottos() {
    this.data.lottos = Array.from(Array(this.data.amount)).map(x => this.createOneLotto());
  }

  createOneLotto() {
    return Array.from(Array(LOTTO_LENGTH)).map(x => Math.floor(Math.random() * LOTTO_MAX_NUMBER));
  }
};