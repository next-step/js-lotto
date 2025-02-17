import { LottoStatistics } from "../src/domain/models/LottoStatistics.js";

describe("LottoStatistics", () => {
  test("should correctly calculate the total prize amount", () => {
    const rankCount = { 1: 1, 2: 2, 3: 0, 4: 3, 5: 4 };
    const totalAmount = 100000;

    const statistics = new LottoStatistics(rankCount, totalAmount);
    const totalPrize = statistics.calculateTotalPrize();

    expect(totalPrize).toBe(
      1 * 2000000000 + 2 * 30000000 + 0 * 1500000 + 3 * 50000 + 4 * 5000,
    );
  });

  test("should correctly calculate the profit rate", () => {
    const rankCount = { 1: 0, 2: 1, 3: 1, 4: 0, 5: 0 };
    const totalAmount = 1000000;

    const statistics = new LottoStatistics(rankCount, totalAmount);
    const profitRate = statistics.calculateProfitRate();

    const expectedProfitRate = (
      (0 * 2000000000 +
        1 * 30000000 +
        1 * 1500000 -
        totalAmount / totalAmount) *
      100
    ).toFixed(1);

    expect(profitRate).toBe(expectedProfitRate);
  });
});
