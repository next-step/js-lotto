export default class LottoSeller {
  #price = 1000;

  sellLotto(receivedMoney) {
    if (receivedMoney < 0) {
      return 0;
    }
    return Math.floor(receivedMoney / this.#price);
  }
}
