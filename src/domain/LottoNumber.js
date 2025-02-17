class LottoNumber {
  static MIN_LOTTO_NUMBER = 1;
  static MAX_LOTTO_NUMBER = 45;
  static INVALID_LOTTO_NUMBER = "로또 번호는 1과 45 사이여야 합니다.";
  static CACHE = Array.from(
    { length: LottoNumber.MAX_LOTTO_NUMBER - LottoNumber.MIN_LOTTO_NUMBER + 1 },
    (_, i) => new LottoNumber(i + LottoNumber.MIN_LOTTO_NUMBER),
  );

  #value;

  constructor(value) {
    if (
      !Number.isInteger(value) ||
      value < LottoNumber.MIN_LOTTO_NUMBER ||
      value > LottoNumber.MAX_LOTTO_NUMBER
    ) {
      throw new Error(LottoNumber.INVALID_LOTTO_NUMBER);
    }
    this.#value = value;
  }
  equals(other) {
    return other instanceof LottoNumber && this.#value === other.#value;
  }

  getValue() {
    return this.#value;
  }

  static valueOf(value) {
    if (
      !Number.isInteger(value) ||
      value < LottoNumber.MIN_LOTTO_NUMBER ||
      value > LottoNumber.MAX_LOTTO_NUMBER
    ) {
      throw new Error(LottoNumber.INVALID_LOTTO_NUMBER);
    }
    return LottoNumber.CACHE[value - LottoNumber.MIN_LOTTO_NUMBER];
  }
}

export default LottoNumber;
