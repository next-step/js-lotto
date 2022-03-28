export class LottoIo {
  shop;
  validator;

  constructor(shop, validator) {
    this.shop = shop;
    this.validator = validator;
  }

  restartShop() {
    this.shop.restart();
  }

  inputMoney(money) {
    if (!this.validator.isLowerThanUpperLimit(money)) {
      return false;
    }

    if (!this.validator.isUpperThanLowerLimit(money)) {
      return false;
    }

    if (!this.validator.isDivisibleMoneyByThousand(money)) {
      return false;
    }

    this.shop.inputMoney(money);

    return true;
  }

  inputWinningNumbers(winningNumbers, bonusNumber) {
    this.shop.inputWinningNumbers(winningNumbers, bonusNumber);
  }

  outputTickets() {
    return this.shop.getTickets();
  }

  outputSameCounts() {
    const results = this.shop.getResults();

    return results.getSameCounts();
  }

  outputRateOfReturn() {
    const results = this.shop.getResults();

    return results.getRateOfReturn();
  }

  toggleShowButton() {
    this.shop.toggleIsShowTickets();
  }

  getIsShowTickets() {
    return this.shop.getIsShowTickets();
  }
}
