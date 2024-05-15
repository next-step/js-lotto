import Lotto from "../src/js/domain/Lotto";

describe("로또 기능 테스트", () => {
  test.each(["1,2,3,4,5,6", [1, 2, 3, 4, 5, 6]])(
    "로또 번호가 서로 다른 1이상 45이하의 정수 6개가 문자열 또는 배열 형태로 주어지면 로또가 정상적으로 생성된다.",
    (testSet) => {
      // given
      const lotto = new Lotto(testSet);

      // when
      const lottoNumbers = lotto.numbers;

      // then
      expect(lottoNumbers).toEqual([1, 2, 3, 4, 5, 6]);
    }
  );

  test.each([
    [
      0,
      {
        lottoNumbers: [7, 8, 19, 20, 21, 24],
        winningNumbers: [1, 2, 3, 4, 5, 6],
      },
    ],
    [
      6,
      {
        lottoNumbers: [1, 2, 3, 4, 5, 6],
        winningNumbers: [1, 2, 3, 4, 5, 6],
      },
    ],
  ])(
    "로또 번호와 당첨 번호가 일치하는 갯수는 %s개 이다.",
    (expectedResult, testSet) => {
      // given
      const lotto = new Lotto(testSet.lottoNumbers);

      // when
      const matchingCount = lotto.countMatchingLottoNumbers(
        testSet.winningNumbers
      );

      // then
      expect(matchingCount).toBe(expectedResult);
    }
  );

  test.each([
    [
      "일치하지 않으",
      false,
      {
        lottoNumbers: [1, 2, 3, 4, 5, 6],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      },
    ],
    [
      "일치하",
      true,
      {
        lottoNumbers: [7, 2, 3, 4, 5, 6],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      },
    ],
  ])(
    "보너스 번호와 로또 번호가 %s면 %s 를 반환한다.",
    (_, expectedResult, testSet) => {
      // given
      const lotto = new Lotto(testSet.lottoNumbers);
      const bonusNumber = testSet.bonusNumber;

      // when
      const isBonusNumberMatching = lotto.hasLottoNumber(bonusNumber);

      // then
      expect(isBonusNumberMatching).toBe(expectedResult);
    }
  );
});
