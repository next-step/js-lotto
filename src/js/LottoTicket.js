import {
  NUMBER_OF_LOTTO_NUMBERS,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
} from "./constants";
import { LottoNumberError } from "./errors";

export class LottoTicket {
  #numbers = [];

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

  constructor(numbers) {
    LottoTicket.validateNumbers(numbers);
    this.#numbers = [...numbers];
    this.#numbers.sort();
  }

  get numbers() {
    return [...this.#numbers];
  }
}
