import { RULES } from './constants.js';

function generateLottoNumbers() {
  const lottoNumbers = [];

  const numbers = Array(RULES.LOTTO_NUMBERS_RANGE[1])
    .fill(RULES.LOTTO_NUMBERS_RANGE[0])
    .map((v, i) => v + i);

  for (let i = 0; i < RULES.LOTTO_NUMBERS_LENGTH; i += 1) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    lottoNumbers.push(numbers.splice(randomIndex, 1)[0]);
  }

  return lottoNumbers;
}

class Lotto {
  numbers = [];

  static of(numbers) {
    return new Lotto(numbers);
  }

  constructor(numbers) {
    this.numbers = numbers || generateLottoNumbers();
  }
}

export default Lotto;
