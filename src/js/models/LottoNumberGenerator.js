import {
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBER_COUNT,
  PICKED_NUMBER_COUNT,
} from "../constant/index.js";
class LottoNumberGenerator {
  constructor() {
    this.selectableNumbers = [];
    this.#generateNumbers(LOTTO_MAX_NUMBER);
  }

  #generateNumbers(max) {
    const numbers = Array.from({ length: max }, (_, i) => i + 1);
    this.selectableNumbers = this.#getRandomNumber(numbers);
  }

  #getRandomNumber(numbers) {
    const newNumbers = [...numbers];

    return Array.from({ length: LOTTO_NUMBER_COUNT }).map(_ => {
      const randomIndex = this.#generateIndexInRange(
        newNumbers.length,
        LOTTO_MIN_NUMBER
      );
      const [pickedNumber] = newNumbers.splice(
        randomIndex,
        PICKED_NUMBER_COUNT
      );

      return pickedNumber;
    });
  }

  #generateIndexInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + 1;
  }

  getNumber() {
    return this.selectableNumbers;
  }
}

export default LottoNumberGenerator;
