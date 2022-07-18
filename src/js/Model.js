import { LOTTO_PRICE, LOTTO_NUMBER, LOTTO_LENGTH } from './constant.js';

export default class LottoModel {
  constructor() {
    this.winningNumbers = [];
    this.isShowingNumbers = false;
  }

  #getQuantity(paidAmount) {
    const quantity = Math.floor(paidAmount / LOTTO_PRICE);
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

  generateLotto(paidAmount) {
    const quantity = this.#getQuantity(paidAmount);
    this.winningNumbers = Array.from({ length: quantity }, () => this.#getWinningNumbers());
  }

  toggleShowNumber(isShowingNumbers) {
    this.isShowingNumbers = isShowingNumbers;
  }
}
