import IssueStrategy from "../../src/js/domain/LotteryMachine/IssueStrategy";
import {
  FixedNumberLengthNotSixError,
  FixedNumberElementNotNumberError,
  FixedNumberElementOutOfRangeError,
  FixedNumberElementDuplicatedError,
} from "./errors";

export default class FixedIssueStrategy extends IssueStrategy {
  #fixedNumbers;

  constructor(numbers) {
    super();
    this.#validateNumbers(numbers);
    this.#fixedNumbers = numbers;
  }

  #hasNonNumericElement(numbers) {
    return numbers.some((num) => typeof num !== "number");
  }

  #isOutOfRange(number) {
    return (
      number < IssueStrategy.LOWER_BOUND || number > IssueStrategy.UPPER_BOUND
    );
  }

  #hasOutOfRangeElement(numbers) {
    return numbers.some(this.#isOutOfRange);
  }

  #hasDuplicatedElement(numbers) {
    return new Set(numbers).size !== numbers.length;
  }

  #validateNumbers(numbers) {
    if (!Array.isArray(numbers)) throw new FixedNumberNotArrayError();
    if (numbers.length !== IssueStrategy.LOTTO_DIGITS)
      throw new FixedNumberLengthNotSixError();
    if (this.#hasNonNumericElement(numbers))
      throw new FixedNumberElementNotNumberError();
    if (this.#hasOutOfRangeElement(numbers))
      throw new FixedNumberElementOutOfRangeError();
    if (this.#hasDuplicatedElement(numbers))
      throw new FixedNumberElementDuplicatedError();
  }

  getNumber() {
    return this.#fixedNumbers.shift();
  }
}
