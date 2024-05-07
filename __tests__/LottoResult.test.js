import Lotto from "../src/js/domain/Lotto";
import LottoResult from "../src/js/domain/LottoResult";

describe("로또 당첨 기능 테스트", () => {
  test.each([
    [
      0,
      {
        lottoNumbers: [7, 8, 19, 20, 21, 24],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      },
    ],
    [
      6,
      {
        lottoNumbers: [1, 2, 3, 4, 5, 6],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      },
    ],
  ])(
    "로또 당첨 결과를 파악하려고 할 때 로또 번호와 당첨 번호가 일치하는 갯수는 %s개 이다.",
    (expectedResult, testSet) => {
      // given
      const lottoResult = new LottoResult(
        testSet.winningNumbers,
        testSet.bonusNumber
      );

      // when
      const matchingCount = lottoResult.countMatchingWinningNumbers(
        testSet.lottoNumbers
      );

      // then
      expect(matchingCount).toBe(expectedResult);
    }
  );

  test.each([
    [
      false,
      {
        lottoNumbers: [1, 2, 3, 4, 5, 6],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      },
    ],
    [
      true,
      {
        lottoNumbers: [7, 2, 3, 4, 5, 6],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      },
    ],
  ])(
    "로또 당첨 결과를 파악하려고 할 때 보너스 번호와 로또 번호 중 일치여부 %s 를 반환한다.",
    (expectedResult, testSet) => {
      // given
      const lottoNumbers = testSet.lottoNumbers;
      const winningNumbers = testSet.winningNumbers;
      const bonusNumber = testSet.bonusNumber;
      const lottoResult = new LottoResult(winningNumbers, bonusNumber);

      // when
      const isBonusNumberMatching =
        lottoResult.isBonusNumberMatching(lottoNumbers);

      // then
      expect(isBonusNumberMatching).toBe(expectedResult);
    }
  );

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
