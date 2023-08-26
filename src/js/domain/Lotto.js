import {
  NUMBER_OF_LOTTO_NUMBERS,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
  LOTTO_PRIZE_MAP,
} from "../constants";
import { LottoNumberError } from "../errors";

import { chooseSome } from "../utils";

const ALL_LOTTO_NUMBERS = Array.from(
  {
    length: MAX_LOTTO_NUMBER - MIN_LOTTO_NUMBER + 1,
  },
  (v, i) => i + MIN_LOTTO_NUMBER
);
Object.freeze(ALL_LOTTO_NUMBERS);

export class Lotto {
  #numbers = [];
  #isChecked = false;
  #place;

  constructor(numbers) {
    Lotto.validateNumbers(numbers);
    this.#numbers = [...numbers];
    this.#numbers.sort();
  }

  get numbers() {
    return [...this.#numbers];
  }

  get place() {
    return this.#place;
  }

  get prize() {
    return this.#isChecked ? LOTTO_PRIZE_MAP[this.#place] || 0 : undefined;
  }

  check(winningNumber) {
    const matchingNumbers = this.#numbers.filter((number) =>
      winningNumber.winningNumbers.includes(number)
    );
    const matchingNumbersCount = matchingNumbers.length;
    switch (matchingNumbersCount) {
      case 6:
        this.#place = 1;
        break;
      case 5:
        this.#place = this.#numbers.includes(winningNumber.bonusNumber) ? 2 : 3;
        break;
      case 4:
        this.#place = 4;
        break;
      case 3:
        this.#place = 5;
        break;
      default:
        this.#place = 0;
    }
    this.#isChecked = true;
  }

  static get ALL_LOTTO_NUMBERS() {
    return ALL_LOTTO_NUMBERS;
  }

  static validateNumbers(numbers) {
    if (numbers.length < NUMBER_OF_LOTTO_NUMBERS) {
      throw new LottoNumberError("Too few numbers");
    }
    if (numbers.length > NUMBER_OF_LOTTO_NUMBERS) {
      throw new LottoNumberError("Too many numbers");
    }
    if (
      numbers.some(
        (number) => number < MIN_LOTTO_NUMBER || number > MAX_LOTTO_NUMBER
      )
    ) {
      throw new LottoNumberError("Contains an invalid number");
    }
    if (new Set(numbers).size !== numbers.length) {
      throw new LottoNumberError("Duplicate numbers");
    }
  }

  static random() {
    const randomNumbers = chooseSome(
      ALL_LOTTO_NUMBERS,
      NUMBER_OF_LOTTO_NUMBERS
    );
    return new Lotto(randomNumbers);
  }
}
