import {
  IssueStrategyIsAbstractClassError,
  GetNumberNotImplementedError,
} from "./errors.js";

class IssueStrategy {
  static LOTTO_DIGITS = 6;
  static LOWER_BOUND = 1;
  static UPPER_BOUND = 45;

  constructor() {
    if (new.target === IssueStrategy) {
      throw new IssueStrategyIsAbstractClassError();
    }
  }

  getNumber() {
    throw new GetNumberNotImplementedError();
  }

  getLottoNumbers() {
    const lottoNumbers = new Set();

    while (lottoNumbers.size < IssueStrategy.LOTTO_DIGITS) {
      lottoNumbers.add(this.getNumber());
    }

    return Array.from(lottoNumbers);
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
