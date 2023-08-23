export class LottoNumber {
  static MIN = 1;

  static MAX = 45;

  #number;

  constructor(number) {
    LottoNumber.#validate(number);
    this.#number = number;
  }

  get number() {
    return this.#number;
  }

  static #validate(number) {
    if (number < LottoNumber.MIN || number > LottoNumber.MAX || typeof number !== 'number') {
      throw new Error(`${LottoNumber.MIN} ~ ${LottoNumber.MAX} 사이의 숫자를 입력해주세요!}`);
    }
  }
}
