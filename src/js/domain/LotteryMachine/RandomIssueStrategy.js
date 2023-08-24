import IssueStrategy from "./IssueStrategy.js";

export default class RandomIssueStrategy extends IssueStrategy {
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
