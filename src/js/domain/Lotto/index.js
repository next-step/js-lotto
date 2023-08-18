import {
  LottoNumbersNotArrayError,
  LottoNumbersLengthNotSixError,
  LottoNumbersElementNotNumberError,
  LottoNumbersElementOutOfRangeError,
  LottoNumbersElementDuplicatedError,
  LottoMatchResultNotSetError,
} from "./errors";

export default class Lotto {
  #lottoNumbers;
  #matchCount;
  #isBonusMatch;

  static LOWER_BOUND = 1;
  static UPPER_BOUND = 45;

  static of(numbers) {
    return new Lotto(numbers);
  }

  constructor(numbers) {
    this.#validateLottoNumbers(numbers);
    this.#lottoNumbers = numbers;
    this.#matchCount = null;
    this.#isBonusMatch = null;
  }

  #hasNonNumericElement(numbers) {
    return numbers.some((number) => typeof number !== "number");
  }

  #isOutOfRange(number) {
    return number < Lotto.LOWER_BOUND || number > Lotto.UPPER_BOUND;
  }

  #hasOutOfRangeElement(numbers) {
    return numbers.some(this.#isOutOfRange);
  }

  #hasDuplicatedElement(numbers) {
    return new Set(numbers).size !== numbers.length;
  }

  #validateLottoNumbers(numbers) {
    if (!Array.isArray(numbers)) throw new LottoNumbersNotArrayError();
    if (numbers.length !== 6) throw new LottoNumbersLengthNotSixError();
    if (this.#hasNonNumericElement(numbers))
      throw new LottoNumbersElementNotNumberError();
    if (this.#hasOutOfRangeElement(numbers))
      throw new LottoNumbersElementOutOfRangeError();
    if (this.#hasDuplicatedElement(numbers))
      throw new LottoNumbersElementDuplicatedError();
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
