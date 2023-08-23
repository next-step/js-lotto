import { LottoPrize } from './LottoPrize.js';

export class FifthPrize extends LottoPrize {
  #prize = 5_000;

  getPrize() {
    return this.#prize;
  }
}
