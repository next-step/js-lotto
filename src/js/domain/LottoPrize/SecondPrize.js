import { LottoPrize } from './LottoPrize.js';

export class SecondPrize extends LottoPrize {
  #prize = 30_000_000;

  getPrize() {
    return this.#prize;
  }
}
