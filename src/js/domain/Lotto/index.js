import {
  NotArrayError,
  LengthNotSixError,
  ElementNotNumberError,
  ElementOutOfRangeError,
  ElementDuplicatedError,
} from "./errors";

export default class Lotto {
  #lottoNumbers;
  #matchedCount;
  #isBonusMatched;

  static LOW_BOUND = 1;
  static HIGH_BOUND = 45;

  static of(numbers) {
    return new Lotto(numbers);
  }

  constructor(numbers) {
    this.validateLottoNumbers(numbers);
    this.#lottoNumbers = numbers;
    this.#matchedCount = null;
    this.#isBonusMatched = null;
  }

  hasNonNumericElement(numbers) {
    return numbers.some((num) => typeof num !== "number");
  }

  isOutOfRange(number) {
    return number < Lotto.LOW_BOUND || number > Lotto.HIGH_BOUND;
  }

  hasOutOfRangeElement(numbers) {
    return numbers.some(this.isOutOfRange);
  }

  hasDuplicatedElement(numbers) {
    return new Set(numbers).size !== numbers.length;
  }

  validateLottoNumbers(numbers) {
    if (!Array.isArray(numbers)) throw new NotArrayError();
    if (numbers.length !== 6) throw new LengthNotSixError();
    if (this.hasNonNumericElement(numbers)) throw new ElementNotNumberError();
    if (this.hasOutOfRangeElement(numbers)) throw new ElementOutOfRangeError();
    if (this.hasDuplicatedElement(numbers)) throw new ElementDuplicatedError();
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
