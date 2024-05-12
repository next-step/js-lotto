import Lotto from "../src/js/domain/Lotto";

describe("로또 기능 테스트", () => {
  test("각 로또는 랜덤의 서로 다른 1이상 45이하의 정수 6개로 이루어져있다.", () => {
    // given
    const randomNumbers = Lotto.generateLottoNumbers();
    const lotto = new Lotto(randomNumbers);

    // when
    const lottoNumbers = lotto.numbers;

    // then

    // 중복되지 않는 로또 번호 개수 확인을 위한 집합
    const lottoNumbersSet = new Set();

    expect(lottoNumbers).toHaveLength(Lotto.LENGTH_LOTTO_NUMBERS);
    lottoNumbers.forEach((lottoNumber) => {
      lottoNumbersSet.add(lottoNumber);
      expect(lottoNumber).toBeGreaterThanOrEqual(Lotto.MIN_LOTTO_NUMBER);
      expect(lottoNumber).toBeLessThanOrEqual(Lotto.MAX_LOTTO_NUMBER);
    });
    expect(Array.from(lottoNumbersSet)).toHaveLength(6);
  });

  test("로또를 발행할 때 로또를 구입한 금액 이하의 발급할 수 있는 최대 개수의 로또를 발행한다.", () => {
    // given
    const purchasedAmount = 10001;

    // when
    const availableLottoCount = Lotto.getAvailableLottoCount(purchasedAmount);

    // then
    expect(availableLottoCount).toBe(10);
  });

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
