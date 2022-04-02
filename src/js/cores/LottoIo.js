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
    if (!this.validator.isLowerThanUpperLimit(money)) return false;

    if (!this.validator.isUpperThanLowerLimit(money)) return false;

    if (!this.validator.isDivisibleMoneyByThousand(money)) return false;

    this.shop.inputMoney(money);

    return true;
  }

  inputWinningNumbers(winningNumbers, bonusNumber) {
    const filteredWinningNumbers = [...winningNumbers, bonusNumber].filter(
      (winningNumber) => winningNumber !== 0
    );

    if (!this.validator.isAllWinningNumbersInput(filteredWinningNumbers))
      return false;

    if (
      !this.validator.isAllWinningNumbersUpperThanMinNumber(
        filteredWinningNumbers
      )
    )
      return false;

    if (
      !this.validator.isAllWinningNumbersLowerThanMaxNumber(
        filteredWinningNumbers
      )
    )
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
