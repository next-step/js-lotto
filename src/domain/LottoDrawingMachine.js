import { generateUniqueRandomNumbers } from "../utils/number";

export default class LottoDrawingMachine {
  #winningNumbersCount;
  #bonusNumberCount;
  #minNumber;
  #maxNumber;
  #winningNumbers = [];
  #bonusNumbers = [];

  constructor({ winningNumbersCount, bonusNumberCount, minNumber, maxNumber }) {
    this.#winningNumbersCount = winningNumbersCount;
    this.#bonusNumberCount = bonusNumberCount;
    this.#minNumber = minNumber;
    this.#maxNumber = maxNumber;
  }

  drawNumbers() {
    const numbers = generateUniqueRandomNumbers(
      this.#winningNumbersCount + this.#bonusNumberCount,
      this.#minNumber,
      this.#maxNumber
    );

    this.bonusNumbers = numbers.splice(-this.#bonusNumberCount);
    this.winningNumbers = numbers;
  }

  set winningNumbers(numbers) {
    this.#winningNumbers = numbers;
  }

  set bonusNumbers(numbers) {
    this.#bonusNumbers = numbers;
  }

  get winningNumbers() {
    return this.#winningNumbers;
  }

  get bonusNumbers() {
    return this.#bonusNumbers;
  }
}
