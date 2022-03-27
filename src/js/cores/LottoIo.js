export class LottoIo {
  lottoShop;
  lottoValidator;

  constructor(lottoShop, lottoValidator) {
    this.lottoShop = lottoShop;
    this.lottoValidator = lottoValidator;
  }

  inputMoney(money) {
    if (!this.lottoValidator.isLowerThanUpperLimit(money)) {
      return false;
    }

    if (!this.lottoValidator.isUpperThanLowerLimit(money)) {
      return false;
    }

    if (!this.lottoValidator.isDivisibleMoneyByThousand(money)) {
      alert('로또 구입 금액을 1,000 단위로 입력해 주세요.');

      return false;
    }

    this.lottoShop.inputMoney(money);

    return true;
  }

  inputWinningNumbers() {}

  clearLottoTickets() {
    this.lottoShop.clearLottoTickets();
  }

  outputLottoTickets() {
    return this.lottoShop.getLottoTickets();
  }

  toggleShowButton() {
    this.lottoShop.toggleIsShowLottoTickets();
  }

  getIsShowLottoTickets() {
    return this.lottoShop.getIsShowLottoTickets();
  }
}
