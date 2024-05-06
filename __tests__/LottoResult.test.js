import Lotto from "../src/js/domain/Lotto";
import LottoResult from "../src/js/domain/LottoResult";

describe("로또 당첨 기능 테스트", () => {
  test("로또 당첨 결과를 파악하려고 할 때 로또 번호와 당첨 번호가 일치하는 갯수를 구해야 한다.", () => {
    // given
    const purchasedLotto = new Lotto();
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const lottoResult = new LottoResult(winningNumbers);

    // when
    const matchingCount = lottoResult.countMatchingWinningNumbers(
      purchasedLotto.numbers
    );

    // then
    expect(matchingCount).toBeGreaterThanOrEqual(0);
    expect(matchingCount).toBeLessThanOrEqual(6);
  });

  test("로또 당첨 결과를 파악하기 위해서는 보너스 번호와 당첨 번호가 일치하는지 여부를 구해야 한다.", () => {
    // given
    const purchasedLotto = new Lotto();
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const lottoResult = new LottoResult(winningNumbers, bonusNumber);

    // when
    const isBonusNumberMatching = lottoResult.getIsBonusNumberMatching(
      purchasedLotto.numbers
    );

    // then
    expect(typeof isBonusNumberMatching).toBe("boolean");
  });
});
