import { LOTTO_NUMBER_COUNT } from "../constant/index.js";
class LottoNumberGenerator {
  #MIN = 1;
  #MAX = 45;
  #pickedNumberCount = 1;
  constructor() {
    this.selectableNumbers = [];
    this.generateNumbers(this.#MAX);
  }

  generateNumbers(max) {
    const numbers = Array.from({ length: max }, (_, i) => i + 1);
    this.selectableNumbers = this.#getRandomNumber(numbers);
  }

  #getRandomNumber(numbers) {
    const newNumbers = [...numbers];

    return Array.from({ length: LOTTO_NUMBER_COUNT }).map(_ => {
      const randomIndex = this.generateIndexInRange(
        newNumbers.length,
        this.#MIN
      );
      const [pickedNumber] = newNumbers.splice(
        randomIndex,
        this.#pickedNumberCount
      );

      return pickedNumber;
    });
  }

  generateIndexInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + 1;
  }

  getNumber() {
    return this.selectableNumbers;
  }
}

export default LottoNumberGenerator;
