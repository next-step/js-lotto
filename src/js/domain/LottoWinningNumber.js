import {
  NUMBER_OF_WINNING_NUMBERS,
  MIN_WINNING_NUMBER,
  MAX_WINNING_NUMBER,
} from "../constants";
import { WinningNumberError } from "../errors";

export class LottoWinningNumber {
  #winningNumbers;
  #bonusNumber;

  static validateNumbers(winningNumbers, bonusNumber = NaN) {
    if (winningNumbers.length < NUMBER_OF_WINNING_NUMBERS) {
      throw new WinningNumberError("Too few winning numbers");
    }
    if (winningNumbers.length > NUMBER_OF_WINNING_NUMBERS) {
      throw new WinningNumberError("Too many winning numbers");
    }
    if (
      winningNumbers.some(
        (number) => number < MIN_WINNING_NUMBER || number > MAX_WINNING_NUMBER
      )
    ) {
      throw new WinningNumberError("Contains an invalid winning number");
    }
    if (new Set(winningNumbers).size !== winningNumbers.length) {
      throw new WinningNumberError("Duplicate winning numbers");
    }
    if (!isNaN(bonusNumber)) {
      if (
        bonusNumber < MIN_WINNING_NUMBER ||
        bonusNumber > MAX_WINNING_NUMBER
      ) {
        throw new WinningNumberError("Invalid bonus number");
      }

      if (winningNumbers.includes(bonusNumber)) {
        throw new WinningNumberError(
          "Duplicate bonus number in winning numbers"
        );
      }
    }
  }

  constructor(winningNumbers, bonusNumber) {
    LottoWinningNumber.validateNumbers(winningNumbers, bonusNumber);
    this.#winningNumbers = [...winningNumbers];
    this.#winningNumbers.sort();
    this.#bonusNumber = bonusNumber;
  }

  get winningNumbers() {
    return [...this.#winningNumbers];
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}
