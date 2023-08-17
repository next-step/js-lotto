import {
  IssueStrategyIsAbstractClassError,
  getNumberNotImplementedError,
} from "./errors";

class IssueStrategy {
  static LOTTO_DIGITS = 6;

  #lottoNumbers;

  constructor() {
    if (new.target === IssueStrategy) {
      throw new IssueStrategyIsAbstractClassError();
    }
    this.#lottoNumbers = new Set();
  }

  getNumber() {
    throw new getNumberNotImplementedError();
  }

  getLottoNumbers() {
    while (this.#lottoNumbers.size < IssueStrategy.LOTTO_DIGITS) {
      this.#lottoNumbers.add(this.getNumber());
    }
    return Array.from(this.#lottoNumbers);
  }
}

export class RandomIssueStrategy extends IssueStrategy {
  static LOWER_BOUND = 1;
  static UPPER_BOUND = 45;

  #lowerBound;
  #upperBound;

  constructor(
    lowerBound = RandomIssueStrategy.LOWER_BOUND,
    upperBound = RandomIssueStrategy.UPPER_BOUND
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
  #numbers;

  constructor(numbers) {
    super();
    this.#numbers = numbers;
  }

  getNumber() {
    return this.#numbers.shift();
  }
}
