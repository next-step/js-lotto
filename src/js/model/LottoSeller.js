export default class LottoSeller {
  #price = 1000;

  calculateLotto(receivedMoney) {
    if (receivedMoney < 0) {
      return 0;
    }
    return Math.floor(receivedMoney / this.#price);
  }

  sellLotto(machine, count) {
    return Array(count).map(() => machine.drawLots());
  }
}
