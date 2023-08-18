import { LottoMatchResultNotSetError } from "./errors";

export default class Lotto {
  #lottoNumbers;
  #matchCount;
  #isBonusMatch;

  static of(numbers) {
    return new Lotto(numbers);
  }

  constructor(numbers) {
    this.#lottoNumbers = numbers;
    this.#matchCount = null;
    this.#isBonusMatch = null;
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }

  getMatchResult() {
    if (this.#matchCount === null) throw new LottoMatchResultNotSetError();

    return {
      matchCount: this.#matchCount,
      isBonusMatch: this.#isBonusMatch,
    };
  }

  setMatchCount(count) {
    this.#matchCount = count;
  }

  setIsBonusMatch(isMatch) {
    this.#isBonusMatch = isMatch;
  }
}
