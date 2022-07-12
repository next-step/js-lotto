import { LOTTO_PRICE, LOTTO_NUMBER, LOTTO_LENGTH } from './constant.js';

export default class LottoModel {
  constructor() {
    this.winningNumbers = [];
    this.showNumbers = false;
  }

  #getQuantity(value) {
    const quantity = Math.floor(value / LOTTO_PRICE);
    return quantity;
  }

  #getWinningNumbers() {
    const baseNumbers = Array.from({ length: LOTTO_NUMBER.MAX }, (_, i) => i + 1);
    const winningNumbers = new Set();
    do {
      winningNumbers.add(Math.floor(Math.random() * baseNumbers.length) + 1);
    } while (winningNumbers.size < LOTTO_LENGTH);
    return Array.from(winningNumbers);
  }

  generateLotto(value) {
    const quantity = this.#getQuantity(value);
    this.winningNumbers = Array.from({ length: quantity }, () => this.#getWinningNumbers());
  }
}
