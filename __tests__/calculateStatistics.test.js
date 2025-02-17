import { calculateStatistics } from "../src/domain/calculateStatistics";
import { LOTTO_PRIZES, PRICE_PER_LOTTO } from "../src/domain/constants";

describe("calculateStatistics 함수 테스트", () => {
  it.each([
    [
      [
        { matchedNumbers: [], isBonusMatched: false },
        { matchedNumbers: [1], isBonusMatched: false },
        { matchedNumbers: [1, 2], isBonusMatched: false },
      ],
      new Map([
        ["3", 0],
        ["4", 0],
        ["5", 0],
        ["5bonus", 0],
        ["6", 0],
      ]),
    ],
    [
      [
        { matchedNumbers: [1, 2, 3], isBonusMatched: false }, // 3개 일치
        { matchedNumbers: [4, 5, 6, 7], isBonusMatched: false }, // 4개 일치
        { matchedNumbers: [8, 9, 10, 11, 12], isBonusMatched: false }, // 5개 일치
        { matchedNumbers: [13, 14, 15, 16, 17], isBonusMatched: true }, // 5개 + 보너스
        { matchedNumbers: [18, 19, 20, 21, 22, 23], isBonusMatched: false }, // 6개 일치
      ],
      new Map([
        ["3", 1],
        ["4", 1],
        ["5", 1],
        ["5bonus", 1],
        ["6", 1],
      ]),
    ],
  ])(
    "각 당첨 개수를 올바르게 계산해야 한다.",
    (comparedResults, matchedCount) => {
      const 결과 = calculateStatistics(comparedResults);
      expect(결과.matchedCount).toEqual(matchedCount);
    }
  );

  it("수익률을 올바르게 계산해야 한다.", () => {
    const comparedResults = [
      { matchedNumbers: [1, 2, 3], isBonusMatched: false }, // 3개 일치 (5,000원)
      { matchedNumbers: [4, 5, 6, 7], isBonusMatched: false }, // 4개 일치 (50,000원)
      { matchedNumbers: [8, 9, 10, 11, 12], isBonusMatched: false }, // 5개 일치 (1,500,000원)
      { matchedNumbers: [13, 14, 15, 16, 17], isBonusMatched: true }, // 5개 + 보너스 (30,000,000원)
      { matchedNumbers: [18, 19, 20, 21, 22, 23], isBonusMatched: false }, // 6개 일치 (2,000,000,000원)
    ];

    const statistics = calculateStatistics(comparedResults);

    const expectedTotalPrizes =
      LOTTO_PRIZES["3"] +
      LOTTO_PRIZES["4"] +
      LOTTO_PRIZES["5"] +
      LOTTO_PRIZES["5bonus"] +
      LOTTO_PRIZES["6"];

    const expectedTotalSpending = 5 * PRICE_PER_LOTTO;

    expect(statistics.profitRate).toBe(
      (expectedTotalPrizes / expectedTotalSpending) * 100
    );
  });
});
