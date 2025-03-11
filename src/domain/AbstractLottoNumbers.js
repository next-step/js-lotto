import LottoNumbers from "./LottoNumbers.js";

export default class AbstractLottoNumbers {
  #numbers;

  constructor({ numbers, min, max, count }) {
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
