import { ERROR_MESSAGE_LOTTO_LENGTH } from '../constants';

class Lotto {
  #numbers;
  #result;

  constructor(numbers) {
    this.validLottoLength(numbers);
    this.#numbers = numbers;
    this.#result = 0;
  }

  get numbers() {
    return this.#numbers;
  }

  validLottoLength(numbers) {
    if (numbers.length !== 6) throw new Error(ERROR_MESSAGE_LOTTO_LENGTH);
  }
}

export default Lotto;
