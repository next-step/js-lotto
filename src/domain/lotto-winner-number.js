export class LottoWinnerNumber {

  #numbers;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    numbers.sort();
    this.#numbers = numbers;
    this.#bonusNumber = bonusNumber;
  }

  get numbers() {
    return this.#numbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}
