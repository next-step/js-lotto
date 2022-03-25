export class LottoInput {
  lottoShop;
  lottoValidator;

  constructor(lottoShop, lottoValidator) {
    this.lottoShop = lottoShop;
    this.lottoValidator = lottoValidator;
  }

  inputMoney(money) {
    if (!this.lottoValidator.isLowerThanUpperLimit(money)) {
      return;
    }

    if (!this.lottoValidator.isUpperThanLowerLimit(money)) {
      return;
    }

    if (!this.lottoValidator.isDivisibleMoneyByThousand(money))
      return alert('로또 구입 금액을 1,000 단위로 입력해 주세요.');

    this.lottoShop.inputMoney(money);
  }
}
