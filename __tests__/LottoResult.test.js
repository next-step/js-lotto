import { Lotto } from "../src/domain/Lotto";
import { LottoResult } from "../src/domain/LottoResult";

describe("로또결과 테스트", () => {
  test.each([
    [[1, 2, 3, 4, 5, 6], 1],
    [[1, 2, 3, 4, 5, 7], 2],
    [[1, 2, 3, 4, 5, 8], 3],
    [[1, 2, 3, 4, 8, 9], 4],
    [[1, 2, 3, 8, 9, 10], 5],
    [[1, 2, 7, 8, 9, 10], 6],
  ])(
    "사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 순위를 정한다. 로또 번호 %p, 당첨 순위 %i",
    (numbers, rank) => {
      // given
      const lotto = new Lotto(numbers);

      // when
      const lottoResult = new LottoResult([1, 2, 3, 4, 5, 6], 7);
      const ranking = lottoResult.getRanking(lotto);

      // then
      expect(ranking).toBe(rank);
    }
  );

  test("당첨 순위에 따라 상금을 계산한다.", () => {
    // given
    const lottoResult = new LottoResult([1, 2, 3, 4, 5, 6], 7);
    // when
    const rank1 = lottoResult.getWinningAmount(1);
    const rank2 = lottoResult.getWinningAmount(2);
    const rank3 = lottoResult.getWinningAmount(3);
    const rank4 = lottoResult.getWinningAmount(4);
    const rank5 = lottoResult.getWinningAmount(5);
    const rank6 = lottoResult.getWinningAmount(6);

    // then
    expect(rank1).toBe(2000000000);
    expect(rank2).toBe(30000000);
    expect(rank3).toBe(1500000);
    expect(rank4).toBe(50000);
    expect(rank5).toBe(5000);
    expect(rank6).toBe(0);
  });

  test("각 로또 티켓의 당첨 결과를 계산한다.", () => {
    // given
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto2 = new Lotto([1, 2, 3, 4, 5, 7]);
    const lotto3 = new Lotto([1, 2, 3, 4, 5, 8]);
    const lottoResult = new LottoResult([1, 2, 3, 4, 5, 6], 7);

    // when
    const result = lottoResult.getWinningResult([lotto1, lotto2, lotto3]);

    // then
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(1);
    expect(result[3]).toBe(1);
    expect(result[4]).toBe(0);
    expect(result[5]).toBe(0);
    expect(result[6]).toBe(0);
  });

  test("수익률을 계산한다.", () => {
    // given
    const lotto1 = new Lotto([1, 2, 3, 8, 9, 10]);
    const lotto2 = new Lotto([1, 2, 3, 8, 9, 10]);
    const lottoResult = new LottoResult([1, 2, 3, 4, 5, 6], 7);

    // when
    const profitRate = lottoResult.getProfitRate({
      amount: 2 * Lotto.PRICE,
      lottoList: [lotto1, lotto2],
    });

    // then
    expect(profitRate).toBe(500);
  });
});
