import { Lotto } from "../src/domain/Lotto";
import { LottoResult } from "../src/domain/LottoResult";
import { View } from "../src/views/view";

describe("출력 테스트", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("구매한 로또 수와 로또 번호를 출력한다.", () => {
    // given
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto2 = new Lotto([1, 2, 3, 4, 5, 7]);
    const logSpy = jest.spyOn(console, "log");

    // when
    View.outputBuyLog(2, [lotto1, lotto2]);

    // then
    expect(logSpy).toHaveBeenCalledWith(
      `2개를 구매했습니다.\n[1, 2, 3, 4, 5, 6]\n[1, 2, 3, 4, 5, 7]`
    );
  });

  test("당첨 내역 및 수익률을 출력한다.", () => {
    // given
    const lottoList = [
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [1, 3, 5, 14, 22, 45],
    ].map((numbers) => new Lotto(numbers));
    const lottoResult = new LottoResult([1, 2, 3, 4, 5, 6], 7);
    const logSpy = jest.spyOn(console, "log");

    // when
    View.outputWinningLog(
      lottoResult.getWinningResult(lottoList),
      lottoResult.getProfitRate({
        amount: lottoList.length * Lotto.PRICE,
        lottoList,
      })
    );

    // then
    const logs = [
      "당첨 통계",
      "--------------------",
      "3개 일치 (5,000원) - 1개",
      "4개 일치 (50,000원) - 0개",
      "5개 일치 (1,500,000원) - 0개",
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
      "6개 일치 (2,000,000,000원) - 0개",
      "총 수익률은 62.5%입니다.",
    ].join("\n");

    expect(logSpy).toHaveBeenCalledWith(logs);
  });
});
