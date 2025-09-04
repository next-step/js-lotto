import WinningNumbers from "../src/class/winningNumbers.js";

describe("당첨번호", () => {
  test("당첨번호가 1~45번 사이의 번호인가?", () => {
    // given
    const numberEntered = [1, 2, 3, 4, 5, 6];
    const bonusNumberEntered = 7;
    const winningNumbers = new WinningNumbers(
      numberEntered,
      bonusNumberEntered
    );

    // when
    const isValid = winningNumbers.isValidRangeWinningNumber();

    // then
    expect(isValid).toBe(true);
  });

  test("보너스 번호가 1~45번 사이의 번호인가?", () => {
    // given
    const numberEntered = [1, 2, 3, 4, 5, 6];
    const bonusNumberEntered = 7;
    const winningNumbers = new WinningNumbers(
      numberEntered,
      bonusNumberEntered
    );

    // when
    const isValid = winningNumbers.isValidRangeBonusNumber();

    // then
    expect(isValid).toBe(true);
  });

  test("당첨번호가 6개인가?", () => {
    // given
    const numberEntered = [1, 2, 3, 4, 5, 6];
    const bonusNumberEntered = 7;
    const winningNumbers = new WinningNumbers(
      numberEntered,
      bonusNumberEntered
    );

    // when
    const isValid = winningNumbers.isDigitCount();

    // then
    expect(isValid).toBe(true);
  });

  test("당첨번호에 보너스 번호가 포함되지 않는가?", () => {
    // given
    const numberEntered = [1, 2, 3, 4, 5, 6];
    const bonusNumberEntered = 7;
    const winningNumbers = new WinningNumbers(
      numberEntered,
      bonusNumberEntered
    );

    // when
    const isValid = winningNumbers.isBonusNumberNotInWinningNumbers();

    // then
    expect(isValid).toBe(true);
  });

  test("당첨번호, 보너스 번호 입력시 당첨 통계를 출력하는가?", () => {
    // given
    const numberEntered = [1, 2, 3, 4, 5, 6];
    const bonusNumberEntered = 7;
    const winningNumbers = new WinningNumbers(
      numberEntered,
      bonusNumberEntered
    );
    const lottoTickets = [[1, 2, 3, 4, 5, 6]];

    // when
    const output = winningNumbers.checkWinningStatistics(lottoTickets);

    // then
    expect(output).toBeDefined();
  });

  test("당첨금에 따라서 수익률을 출력하는가?", () => {
    // given
    const numberEntered = [1, 2, 3, 4, 5, 6];
    const bonusNumberEntered = 7;
    const winningNumbers = new WinningNumbers(
      numberEntered,
      bonusNumberEntered
    );
    const prizeMoney = 5000;

    // when
    const output = winningNumbers.calculateProfitRate(prizeMoney);

    // then
    expect(output).toBeDefined();
  });
});
