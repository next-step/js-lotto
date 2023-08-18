export default class Lotto {
  #lottoNumbers;
  #matchedCount;
  #isBonusMatched;

  static of(numbers) {
    return new Lotto(numbers);
  }

  constructor(numbers) {
    this.#lottoNumbers = numbers;
    this.#matchedCount = null;
    this.#isBonusMatched = null;
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }

  getMatchResult() {
    return {
      matchedCount: this.#matchedCount,
      isBonusMatched: this.#isBonusMatched,
    };
  }

  setMatchCount(count) {
    this.#matchedCount = count;
  }

  setIsBonusMatched(isMatched) {
    this.#isBonusMatched = isMatched;
  }
}
