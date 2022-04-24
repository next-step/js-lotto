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
    if (!this.validator.isLowerThanHighestLimit(money)) return false;

    if (!this.validator.isUpperThanLowestLimit(money)) return false;

    if (!this.validator.isDivisibleMoneyByThousand(money)) return false;

    this.shop.inputMoney(money);

    return true;
  }

  inputWinningNumbers(winningNumbers, bonusNumber) {
    if (!this.validator.isAllWinningNumbersInput(winningNumbers, bonusNumber))
      return false;

    if (
      !this.validator.isAllWinningNumbersUpperThanMinNumber(
        winningNumbers,
        bonusNumber
      )
    )
      return false;

    if (
      !this.validator.isAllWinningNumbersLowerThanMaxNumber(
        winningNumbers,
        bonusNumber
      )
    )
      return false;

    if (!this.validator.isAllWinningNumbersUnique(winningNumbers, bonusNumber))
      return false;

    this.shop.inputWinningNumbers(winningNumbers, bonusNumber);

    return true;
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
