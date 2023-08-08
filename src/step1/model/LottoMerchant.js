import Lotto from './Lotto.js';

export default class LottoMerchant {
  #receivedAmount;

  static #PRICE_PER_LOTTO = 1000;

  constructor(receivedAmount) {
    this.#receivedAmount = receivedAmount;
  }

  static fromPay(receivedAmount) {
    return new LottoMerchant(receivedAmount);
  }

  #createLottoCount() {
    return Math.floor(this.#receivedAmount / LottoMerchant.#PRICE_PER_LOTTO);
  }

  sellLotto() {
    return Lotto.createLottoByRandomNumber(this.#createLottoCount());
  }
}
