export class LottoNumber {
  static MIN = 1;
  static MAX = 45;
  constructor() {}

  validate(number) {
    return (
      number === '' || number < LottoNumber.MIN || number > LottoNumber.MAX
    );
  }
}
