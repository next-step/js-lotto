export default class WinningNumber {
  #numbers;

  #MIN_NUMBER = 1;
  #MAX_NUMBER = 45;

  constructor() {
    this.#numbers = new Set();
    this.bonusNumber = null;
  }

  #isValidNumber = (number) =>
    number >= this.#MIN_NUMBER &&
    number <= this.#MAX_NUMBER;

  addNumber = (number) => {
    this.#numbers.add(number);
  };

  get numbers() {
    return Array.from(this.#numbers);
  }

  get bonusNumber() {
    return this.bonusNumber;
  }

  set bonusNumber(number) {
    this.bonusNumber = number;
  }

  isValid = () => {
    if (this.#numbers.size !== 6) {
      return throw new Error('당첨번호 중 일반번호는 6개의 숫자로 이루어져 있습니다.');
    }
    if (this.bonusNumber === null) {
      return throw new Error('보너스 번호가 비어있습니다.');
    }
    if (!([this.bonusNumber, ...this.numbers].every(this.#isValidNumber))) {
      return throw new Error('입력한 번호를 다시 확인해주세요.');
    }

    return true;
  };
}
