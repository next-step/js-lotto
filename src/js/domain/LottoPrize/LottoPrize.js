export class LottoPrize {
  static FIRST = 2_000_000_000;

  static SECOND = 30_000_000;

  static THIRD = 1_500_000;

  static FOURTH = 50_000;

  static FIFTH = 5_000;

  #prize = 0;

  getPrize() {
    return this.#prize;
  }
}
