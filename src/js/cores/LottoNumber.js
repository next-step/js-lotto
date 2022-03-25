export class LottoNumber {
  number;
  constructor(number) {
    if (!this.validateNumber(number)) {
      throw new Error('로또 번호가 1 ~ 45 중 하나의 숫자가 아닙니다.');
    }

    this.number = number;
  }

  validateNumber(number) {
    if (number > 0 && number < 46) return true;

    return false;
  }
}
