export class LottoNumber {
  static #MIN_NUMBER = 1;
  static MAX_NUMBER = 45;

  #value;
  get value() {
    return this.#value;
  }

  constructor(value) {
    if (typeof value !== "number") {
      throw new TypeError("value는 number 타입이어야 합니다.");
    }
    if (value < LottoNumber.#MIN_NUMBER || LottoNumber.MAX_NUMBER < value) {
      throw new RangeError(
        `value는 ${LottoNumber.#MIN_NUMBER} ~ ${
          LottoNumber.MAX_NUMBER
        } 사이이어야 합니다.`
      );
    }
    this.#value = value;
  }
}
