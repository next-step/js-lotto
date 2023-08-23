import { LottoNumber } from './LottoNumber.js';

class Lotto {
  static NUMBER_QUANTITY = 6;

  _numbers;

  #hasBonus;

  #matchCount;

  constructor(numbers) {
    this._numbers = numbers.map((number) => new LottoNumber(number)).sort((a, b) => a.value - b.value);
  }

  get numbers() {
    return this._numbers;
  }

  get hasBonus() {
    return this.#hasBonus;
  }

  get matchCount() {
    return this.#matchCount;
  }

  #compare(winningNumbers) {
    this.#matchCount = this._numbers.filter((num) => winningNumbers.includes(num)).length;
  }

  #checkBonus(bonus) {
    this.#hasBonus = this._numbers.includes(bonus);
  }

  check(winningNumbers, bonus) {
    this.#compare(winningNumbers);
    this.#checkBonus(bonus);
  }
}

export default Lotto;
