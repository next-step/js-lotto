import LottoService from "../../src/controller/LottoService.js";

describe("수익률 계산 테스트", () => {
  test("1등 1개 당첨시 수익률을 계산한다", () => {
    const winningResult = new Map([
      [1, 1],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ]);

    const profitRate = LottoService.calculateProfitRate({
      winningResult,
      amount: "8000",
    });

    expect(profitRate).toBe(25000000);
  });

  test("5등 2개 당첨시 수익률을 계산한다", () => {
    const winningResult = new Map([
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 2],
    ]);

    const profitRate = LottoService.calculateProfitRate({
      winningResult,
      amount: "10000",
    });

    expect(profitRate).toBe(100);
  });

  test("당첨되지 않으면 수익률은 0이다", () => {
    const winningResult = new Map([
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ]);

    const profitRate = LottoService.calculateProfitRate({
      winningResult,
      amount: "5000",
    });

    expect(profitRate).toBe(0);
  });
});
