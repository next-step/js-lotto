import {
  IssueStrategyIsAbstractClassError,
  GetNumberNotImplementedError,
} from "./errors.js";

export default class IssueStrategy {
  static LOTTO_DIGITS = 6;
  static LOWER_BOUND = 1;
  static UPPER_BOUND = 45;

  constructor() {
    if (new.target === IssueStrategy) {
      throw new IssueStrategyIsAbstractClassError();
    }
  }

  _getNumber() {
    throw new GetNumberNotImplementedError();
  }

  getLottoNumbers() {
    const lottoNumbers = new Set();

    while (lottoNumbers.size < IssueStrategy.LOTTO_DIGITS) {
      lottoNumbers.add(this._getNumber());
    }

    return Array.from(lottoNumbers);
  }
}
