import Lotto from "../src/js/domain/Lotto";
import LottoResult from "../src/js/domain/LottoResult";

describe("로또 당첨 기능 테스트", () => {
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
    [
      0,
      -1,
      {
        lottoNumbers: [1, 2, 3, 12, 18, 23],
        winningNumbers: [19, 25, 27, 28, 29, 31],
        bonusNumber: 7,
      },
    ],
  ])(
    "로또 당첨 등수를 구하려고 할 때 로또 번호와 당첨 번호가 일치하는 갯수가 %s개 이면 %s등이다.",
    (_, expectedResult, testSet) => {
      // given
      const lotto = new Lotto(testSet.lottoNumbers);
      const winningNumbers = testSet.winningNumbers;
      const bonusNumber = testSet.bonusNumber;
      const lottoResult = new LottoResult(winningNumbers, bonusNumber);

      // when
      const lottoRanking = lottoResult.getLottoRanking(lotto);

      // then
      expect(lottoRanking).toBe(expectedResult);
    }
  );

  test.each([
    [
      "일치하는 것이 있으",
      2,
      {
        lottoNumbers: [1, 2, 3, 4, 5, 12],
        winningNumbers: [1, 2, 3, 4, 5, 9],
        bonusNumber: 12,
      },
    ],
    [
      "일치하는 것이 없으",
      3,
      {
        lottoNumbers: [1, 2, 3, 4, 5, 12],
        winningNumbers: [1, 2, 3, 4, 5, 9],
        bonusNumber: 7,
      },
    ],
  ])(
    "로또 번호와 당첨번호가 일치하는 갯수가 5개일 때 로또 번호 중 보너스 번호와 %s면 %s등이다.",
    (_, expectedResult, testSet) => {
      // given
      const lotto = new Lotto(testSet.lottoNumbers);
      const winningNumbers = testSet.winningNumbers;
      const bonusNumber = testSet.bonusNumber;
      const lottoResult = new LottoResult(winningNumbers, bonusNumber);

      // when
      const lottoRanking = lottoResult.getLottoRanking(lotto);

      // then
      expect(lottoRanking).toBe(expectedResult);
    }
  );

  test.each([
    [1, 2000000000],
    [2, 30000000],
    [3, 1500000],
    [4, 50000],
    [5, 5000],
  ])(
    "로또 당첨 %s등일 때 상금은 %s원이다.",
    (ranking, expectedWinningPrice) => {
      // given

      // when
      const lottoWinningPrice = LottoResult.getLottoWinningPrice(ranking);

      // then
      expect(lottoWinningPrice).toBe(expectedWinningPrice);
    }
  );

  test("로또 당첨 수익률을 계산할 때 결과 값은 총 상금 / 로또를 구입한 금액 이다.", () => {
    // given
    const purchasedAmount = 8000;
    const availableLottoCount = Lotto.getAvailableLottoCount(purchasedAmount);
    const lottoNumbers = [
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [1, 3, 5, 14, 22, 45],
    ];
    const lottos = [];

    for (let i = 0; i < availableLottoCount; i++) {
      lottos.push(new Lotto(lottoNumbers[i]));
    }

    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const lottoResult = new LottoResult(winningNumbers, bonusNumber);
    const totalLottoWinningPrice =
      lottoResult.getTotalLottoWinningPrice(lottos);

    // when
    const totalLottoProfitRate = LottoResult.getTotalLottoProfitRate(
      totalLottoWinningPrice,
      purchasedAmount
    );

    // then
    expect(totalLottoProfitRate).toBe(62.5);
  });
});
