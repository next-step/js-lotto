import {
  PRICE_OF_LOTTO,
  NUM_OF_LOTTO_NUMBERS,
  MIN_LOTTO_NUM,
  MAX_LOTTO_NUM,
} from "../js/util/constants.js";

class Model {
  constructor() {
    this.curLotties = [];
  }

  initLotties() {
    this.curLotties = [];
  }

  buyLotties(paidPrice) {
    this.initLotties();
    const numOfLotties = Math.floor(paidPrice / PRICE_OF_LOTTO);

    for (let _ = 0; _ < numOfLotties; _++) {
      this.curLotties.push(this._autoGenerateNumber());
    }
  }

  _autoGenerateNumber() {
    return Array.from({ length: NUM_OF_LOTTO_NUMBERS }, () => {
      const randomLottoNumber =
        Math.floor(Math.random() * (MAX_LOTTO_NUM - MIN_LOTTO_NUM + 1)) +
        MIN_LOTTO_NUM;
      return randomLottoNumber;
    });
  }
}

export default new Model();
