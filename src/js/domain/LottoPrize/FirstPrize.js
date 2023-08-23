import { LottoPrize } from './LottoPrize.js';

export class FirstPrize extends LottoPrize {
  #prize = 2_000_000_000;

  getPrize() {
    return this.#prize;
  }
}
