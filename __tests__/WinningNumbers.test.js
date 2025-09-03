import WinningNumbers from "../src/class/winningNumbers.js";

describe("당첨번호", () => {
  test("당첨번호 및 보너스 번호가 1~45번 사이의 번호인가?", () => {
    // given
    const winningNumbers = new WinningNumbers();
    const numberEntered = [1, 2, 3, 4, 5, 6];

    // when
    const isValid = winningNumbers.isValidRangeNumber(numberEntered);

    // then
    expect(isValid).toBe(true);
  });

  test("당첨번호가 6개인가?", () => {
    // given
    const winningNumbers = new WinningNumbers();
    const numberEntered = [1, 2, 3, 4, 5, 6];

    // when
    const isValid = winningNumbers.isDigitCount(numberEntered);

    // then
    expect(isValid).toBe(true);
  });

  test("보너스 번호가 1개인가?", () => {
    // given
    const winningNumbers = new WinningNumbers();
    const bonusNumberEntered = "1";

    // when
    const isValid = winningNumbers.isSingleBonusNumber(bonusNumberEntered);

    // then
    expect(isValid).toBe(true);
  });

  test("당첨번호에 보너스 번호가 포함되지 않는가?", () => {
    // given
    const winningNumbers = new WinningNumbers();
    const numberEntered = "1,2,3,4,5,6";
    const bonusNumberEntered = "7";

    // when
    const isValid = winningNumbers.isBonusNumberNotInWinningNumbers(
      numberEntered,
      bonusNumberEntered
    );

    // then
    expect(isValid).toBe(true);
  });

  test("당첨번호, 보너스 번호 입력시 당첨 통계를 출력하는가?", () => {
    // given
    const winningNumbers = new WinningNumbers();
    const numberEntered = "1,2,3,4,5,6";
    const bonusNumberEntered = "7";

    // when
    const output = winningNumbers.checkWinningStatisticsOutput(
      numberEntered,
      bonusNumberEntered
    );

    // then
    expect(output).toBeDefined();
  });

  test("당첨금에 따라서 수익률을 출력하는가?", () => {
    // given
    const winningNumbers = new WinningNumbers();
    const prizeMoney = "5000";

    // when
    const output = winningNumbers.calculateProfitRate(prizeMoney);

    // then
    expect(output).toBeDefined();
  });
});
