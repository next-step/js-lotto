export default class Lotto {
  #lottoNumbers;
  #matchCount;
  #matchBonus;

  static LOW_BOUND = 1;
  static HIGH_BOUND = 45;
  static ERROR_MESSAGE = Object.freeze({
    NOT_ARRAY: "로또 번호는 배열 형태여야합니다.",
    NOT_LENGTH_SIX: "로또 번호는 길이가 6인 배열 형태여야합니다.",
    ELEMENT_NOT_NUMBER: "로또 번호는 모두 숫자여야합니다.",
    ELEMENT_OUT_OF_RANGE: "로또 번호는 모두 [1, 45] 사이의 숫자여야합니다.",
    ELEMENT_DUPLICATED: "로또 번호는 모두 중복되지 않아야합니다.",
  });

  static from(numbers) {
    return new Lotto(numbers);
  }

  // TODO 전략 패턴으로 삽입할지 고민하기
  constructor(numbers) {
    this.validateLottoNumbers(numbers);
    this.#lottoNumbers = numbers;
    this.#matchCount = null;
    this.#matchBonus = null;
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
    if (!Array.isArray(numbers)) throw new Error(Lotto.ERROR_MESSAGE.NOT_ARRAY);
    if (numbers.length !== 6)
      throw new Error(Lotto.ERROR_MESSAGE.NOT_LENGTH_SIX);
    if (this.hasNonNumericElement(numbers))
      throw new Error(Lotto.ERROR_MESSAGE.ELEMENT_NOT_NUMBER);
    if (this.hasOutOfRangeElement(numbers))
      throw new Error(Lotto.ERROR_MESSAGE.ELEMENT_OUT_OF_RANGE);
    if (this.hasDuplicatedElement(numbers))
      throw new Error(Lotto.ERROR_MESSAGE.ELEMENT_DUPLICATED);
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }

  // TODO getMatchInfo로 통합 여부 결정하기
  getMatchCount() {
    return this.#matchCount;
  }

  getMatchBonus() {
    return this.#matchBonus;
  }

  setMatchCount(count) {
    this.#matchCount = count;
  }

  setMatchBonus(isMatched) {
    this.#matchBonus = isMatched;
  }
}
