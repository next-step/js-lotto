import { ERROR_MESSAGE } from '../constants/error-message.js';
import { LOTTO_MAX_NUMBER, LOTTO_MIN_NUMBER } from '../constants/lotto.js';

export class Lotto {
  #numbers;
  constructor(nums) {
    const numbers = nums?.map((num) => parseInt(num, 10));
    this.#valiateLottoNumbers(numbers);
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  has(number) {
    return this.#numbers.includes(number);
  }

  #valiateLottoNumbers(numbers) {
    this.#validateLottoNubers(numbers);
    this.#valiateLottoNumberLength(numbers);
    this.#validateLottoNumberRange(numbers);
    this.#validateDuplicatedLottoNumber(numbers);
  }

  #valiateLottoNumberLength(numbers) {
    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_LOTTO_NUMBER_LENGTH);
    }
  }

  #validateDuplicatedLottoNumber(numbers) {
    if (numbers.length !== new Set(numbers).size) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_LOTTO_NUMBER);
    }
  }

  #validateLottoNumberRange(numbers) {
    if (
      numbers.some(
        (number) => number < LOTTO_MIN_NUMBER || number > LOTTO_MAX_NUMBER
      )
    ) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_LOTTO_NUMBER_RANGE);
    }
  }

  #validateLottoNubers(numbers) {
    if (numbers.some((number) => !Number.isInteger(number))) {
      throw new Error(ERROR_MESSAGE.NOT_VALID_LOTTO_NUMBER);
    }
  }
}
