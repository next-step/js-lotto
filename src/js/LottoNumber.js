export class LottoNumber {
  static #MIN = 1;
  static #MAX = 45;
  isInValid;

  constructor(number) {
    this.validate(number);
  }

  validate(number) {
    this.isInValid =
      number === '' || number < LottoNumber.#MIN || number > LottoNumber.#MAX;
  }
}
