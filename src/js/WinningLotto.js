export default class WinningLotto {
  static #isDuplicatedWinningNumber(winningNumberList, winningNumber) {
    return (
      winningNumberList.filter(
        (winningNumberInList) => winningNumberInList === winningNumber
      ).length > 1
    );
  }

  static isInvalidWinningNumbers(winningNumberList) {
    return winningNumberList.some((winningNumber) =>
      WinningLotto.#isDuplicatedWinningNumber(winningNumberList, winningNumber)
    );
  }
}
