import LottoNumbers from "./LottoNumbers.js";

export default class Lottos {
  #selectedNumbers;

  constructor({
    numbers,
    count = LottoNumbers.LOTTO_SELECTION_COUNT,
    min = LottoNumbers.NUMBER_MIN_RANGE,
    max = LottoNumbers.NUMBER_MAX_RANGE,
  } = {}) {
    const selectedNumbers =
      numbers ?? this.generateUniqueNumbers(min, max, count);

    this.#selectedNumbers = new LottoNumbers({
      numbers: selectedNumbers,
      count,
      min,
      max,
    });
  }

  generateUniqueNumbers(min, max, count) {
    const numbers = new Set();

    while (numbers.size < count) {
      numbers.add(this.getRandomNumber(min, max));
    }

    return Array.from(numbers);
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getMatchCount(numbers) {
    return this.#selectedNumbers.values.filter((selectedNumber) =>
      numbers.includes(selectedNumber)
    ).length;
  }

  get values() {
    return [...this.#selectedNumbers.values];
  }
}
