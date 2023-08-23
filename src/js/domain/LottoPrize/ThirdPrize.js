import { LottoPrize } from './LottoPrize.js';

export class ThirdPrize extends LottoPrize {
  #prize = 1_500_000;

  getPrize() {
    return this.#prize;
  }
}
