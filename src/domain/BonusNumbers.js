import LottoNumbers from "./LottoNumbers.js";

export default class BonusNumbers {
  static BONUS_NUMBER_COUNT = 1;

  #numbers;

  constructor({
    numbers,
    min = LottoNumbers.NUMBER_MIN_RANGE,
    max = LottoNumbers.NUMBER_MAX_RANGE,
    count = BonusNumbers.BONUS_NUMBER_COUNT,
  }) {
    this.#numbers = new LottoNumbers({
      numbers,
      min,
      max,
      count,
    });
  }

  get values() {
    return [...this.#numbers.values];
  }
}
