import {shuffle} from '../utils';
const LOTTO_NUMBERS = Array.from({length: 45}).map((_, index) => index + 1);

export class Lotto {
  #lotteries = [];

  constructor(lotteryCount) {
    this.#lotteries = Array.from({length: lotteryCount}, () => this.#generateLottoNumbers());
  }

  get lotteries() {
    return this.#lotteries;
  }

  #generateLottoNumbers(size = 6) {
    return shuffle(LOTTO_NUMBERS)
      .slice(0, size)
      .sort((a, b) => a - b);
  }
}
