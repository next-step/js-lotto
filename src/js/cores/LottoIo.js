export class LottoIo {
  shop;
  validator;

  constructor(shop, validator) {
    this.shop = shop;
    this.validator = validator;
  }

  inputMoney(money) {
    if (!this.validator.isLowerThanUpperLimit(money)) {
      return false;
    }

    if (!this.validator.isUpperThanLowerLimit(money)) {
      return false;
    }

    if (!this.validator.isDivisibleMoneyByThousand(money)) {
      alert('로또 구입 금액을 1,000 단위로 입력해 주세요.');

      return false;
    }

    this.shop.inputMoney(money);

    return true;
  }

  inputWinningNumbers(winningNumbers) {
    this.shop.inputWinningNumbers(winningNumbers);
  }

  clearTickets() {
    this.shop.clearTickets();
  }

  outputTickets() {
    return this.shop.getTickets();
  }

  toggleShowButton() {
    this.shop.toggleIsShowTickets();
  }

  getIsShowTickets() {
    return this.shop.getIsShowTickets();
  }
}
