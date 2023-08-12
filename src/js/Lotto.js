import { RULES } from './constants.js';

class Lotto {
  numbers = [];

  bonusNumber;

  static of() {
    return new Lotto();
  }

  constructor() {
    const generatedNumbers = this.generateLottoNumbers();
    this.numbers = generatedNumbers.slice(0, RULES.LOTTO_NUMBERS_LENGTH);
    this.bonusNumber = generatedNumbers.at(-1);
  }

  generateLottoNumbers() {
    const lottoNumbers = [];

    const numbers = Array(RULES.LOTTO_NUMBERS_RANGE[1])
      .fill(RULES.LOTTO_NUMBERS_RANGE[0])
      .map((v, i) => v + i);

    for (let i = 0; i < RULES.LOTTO_NUMBERS_LENGTH + 1; i += 1) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      lottoNumbers.push(numbers.splice(randomIndex, 1)[0]);
    }

    return lottoNumbers;
  }
}

export default Lotto;
