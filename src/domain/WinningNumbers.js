import LottoNumbers from "./LottoNumbers.js";

export default class WinningNumbers {
  #numbers;

  constructor({
    numbers,
    min = LottoNumbers.NUMBER_MIN_RANGE,
    max = LottoNumbers.NUMBER_MAX_RANGE,
    count = LottoNumbers.LOTTO_SELECTION_COUNT,
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
