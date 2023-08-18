import {
  IssueStrategyIsAbstractClassError,
  GetNumberNotImplementedError,
  FixedNumberNotArrayError,
  FixedNumberLengthNotSixError,
  FixedNumberElementNotNumberError,
  FixedNumberElementOutOfRangeError,
  FixedNumberElementDuplicatedError,
} from "./errors";

class IssueStrategy {
  static LOTTO_DIGITS = 6;
  static LOWER_BOUND = 1;
  static UPPER_BOUND = 45;

  #lottoNumbers;

  constructor() {
    if (new.target === IssueStrategy) {
      throw new IssueStrategyIsAbstractClassError();
    }
    this.#lottoNumbers = new Set();
  }

  getNumber() {
    throw new GetNumberNotImplementedError();
  }

  getLottoNumbers() {
    while (this.#lottoNumbers.size < IssueStrategy.LOTTO_DIGITS) {
      this.#lottoNumbers.add(this.getNumber());
    }
    return Array.from(this.#lottoNumbers);
  }
}

export class RandomIssueStrategy extends IssueStrategy {
  #lowerBound;
  #upperBound;

  constructor(
    lowerBound = IssueStrategy.LOWER_BOUND,
    upperBound = IssueStrategy.UPPER_BOUND
  ) {
    super();
    this.#lowerBound = lowerBound;
    this.#upperBound = upperBound;
  }

  getNumber() {
    return Math.floor(Math.random() * this.#upperBound) + this.#lowerBound;
  }
}

export class FixedIssueStrategy extends IssueStrategy {
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
