export class LottoNumber {
  static MIN = 1;

  static MAX = 45;

  #value;

  constructor(number) {
    LottoNumber.#validate(number);
    this.#value = number;
  }

  get value() {
    return this.#value;
  }

  static #validate(number) {
    if (number < LottoNumber.MIN || number > LottoNumber.MAX || typeof number !== 'number') {
      throw new Error(`${LottoNumber.MIN} ~ ${LottoNumber.MAX} 사이의 숫자를 입력해주세요!}`);
    }
  }
}
