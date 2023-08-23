import { LottoPrize } from './LottoPrize.js';

export class FourthPrize extends LottoPrize {
  #prize = 50_000;

  getPrize() {
    return this.#prize;
  }
}
