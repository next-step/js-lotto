import generateLottoNumber from "../utils/generateRandomNumber.js";
class Lotto {
  #numbers = [];

  constructor() {
    this.#numbers = this.generateLottoNumbers();
  }

  get numbers() {
    return this.#numbers;
  }

  generateLottoNumbers() {
    const numbersSet = new Set();

    while (numbersSet.size < 6) {
      const number = generateLottoNumber();
      numbersSet.add(number);
    }

    return [...numbersSet].sort((a, b) => a - b);
  }
}

export default Lotto;
