export const ERROR_MESSAGE_LOTTO_LENGTH = '로또번호는 6개 입니다.';

class Lotto {
  #numbers;
  constructor(numbers) {
    this.validLottoLength(numbers);
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  validLottoLength(numbers) {
    if (numbers.length !== 6) throw new Error(ERROR_MESSAGE_LOTTO_LENGTH);
  }
}

export default Lotto;
