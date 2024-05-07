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

  test.each([
    [
      6,
      1,
      {
        lottoNumbers: [1, 2, 3, 4, 5, 6],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      },
    ],
    [
      4,
      4,
      {
        lottoNumbers: [1, 2, 3, 4, 8, 10],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      },
    ],
    [
      3,
      5,
      {
        lottoNumbers: [1, 2, 3, 12, 18, 23],
        winningNumbers: [1, 2, 3, 34, 9, 7],
        bonusNumber: 7,
      },
    ],
  ])(
    "로또 당첨 결과를 구할 때 로또 번호와 당첨번호가 일치하는 갯수가 %s개 이면 %s등이다.",
    (expectedResult, expectedRanking, testSet) => {
      // given
      const lottoNumbers = testSet.lottoNumbers;
      const winningNumbers = testSet.winningNumbers;
      const bonusNumber = testSet.bonusNumber;
      const lottoResult = new LottoResult(winningNumbers, bonusNumber);

      // when
      const lottoRanking = lottoResult.getLottoRanking(lottoNumbers);

      // then
      expect(lottoRanking).toBe(expectedRanking);
    }
  );
});
