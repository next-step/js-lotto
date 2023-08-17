import { ERROR_MESSAGE } from '../constants/error-message';
import { LOTTO_NUMBERS_LENGTH } from '../constants/lotto';
import { getRandomNumber } from '../utils/number';

export class Lotto {
  #numbers;
  constructor() {
    this.#numbers = this.#generateLottoNumbers();
    this.#valiateLengthOfLottoNumbers(this.#numbers);
  }

  #generateLottoNumbers() {
    const numbers = [];

    while (numbers.length < LOTTO_NUMBERS_LENGTH) {
      const randomNumber = getRandomNumber(1, 45);
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }

    return numbers.sort((a, b) => a - b);
  }

  get numbers() {
    return this.#numbers;
  }

  #valiateLengthOfLottoNumbers(numbers) {
    if (!numbers.length) {
      throw new Error(ERROR_MESSAGE.EMPTY_LOTTO_NUMBERS);
    }
  }
}
