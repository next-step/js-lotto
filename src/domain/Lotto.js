import {generateLottoNumbers} from './generateLottoNumbers';

export class Lotto {
  #lotteries = [];

  constructor(lotteryCount) {
    this.#lotteries = Array.from({length: lotteryCount}, () => generateLottoNumbers());
  }

  get lotteries() {
    return this.#lotteries;
  }
}
