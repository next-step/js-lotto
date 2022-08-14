import { LOTTO_PRICE, LOTTO_NUMBER, LOTTO_LENGTH } from '../constant.js';

export class Lotto {
  lottoNumbers;

  constructor() {
    this.lottoNumbers = [];
  }

  #getQuantity(paidAmount) {
    const quantity = Math.floor(paidAmount / LOTTO_PRICE);

    return quantity;
  }

  #getLottoNumbers() {
    const baseNumbers = Array.from({ length: LOTTO_NUMBER.MAX }, (_, i) => i + 1);
    const numbers = new Set();
    do {
      numbers.add(Math.floor(Math.random() * baseNumbers.length) + 1);
    } while (numbers.size < LOTTO_LENGTH);

    return Array.from(numbers);
  }

  generateLotteries(paidAmount) {
    const quantity = this.#getQuantity(paidAmount);
    this.lottoNumbers = Array.from({ length: quantity }, () => this.#getLottoNumbers());
  }

  resetWinningNumbers() {
    this.lottoNumbers = [];
  }
}
