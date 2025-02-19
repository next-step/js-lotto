import LottoGame from "../src/domain/LottoGame";

describe("LottoGame 클래스 테스트", () => {
  it("로또 번호와 당첨 번호를 비교할 때 일치하는 번호를 반환해야 한다.", () => {
    const winningNumbers = [8, 21, 23, 41, 42, 43];
    const bonusNumber = 7;
    const lottoGame = new LottoGame(winningNumbers, bonusNumber);

    const { matchedNumbers, isBonusMatched } = lottoGame.compareNumbers([
      8, 21, 23, 41, 42, 43,
    ]);

    expect(matchedNumbers).toEqual([8, 21, 23, 41, 42, 43]);
    expect(isBonusMatched).toBe(false);
  });

  it("보너스 번호와 일치하면 isBonusMatched는 true여야 한다.", () => {
    const winningNumbers = [8, 10, 23, 41, 42, 43];
    const bonusNumber = 21;
    const lottoGame = new LottoGame(winningNumbers, bonusNumber);

    const { isBonusMatched } = lottoGame.compareNumbers([
      8, 21, 23, 41, 42, 43,
    ]);

    expect(isBonusMatched).toBe(true);
  });
});
