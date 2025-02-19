import Lotto from "../src/lotto";
import {
  checkResult,
  computeTotalPrize,
  calculateLottoProfitRatio,
} from "../src/result";

describe("로또를 사고 당첨 번호도 입력한 이후", () => {
  let lotto;

  beforeEach(() => {
    lotto = new Lotto(3000);
  });

  test("배열의 인덱스에 각 순위에 당첨된 만큼 숫자가 1씩 증가한다.", () => {
    const 당첨_번호 = [[1, 2, 3, 4, 5, 6], 7];
    lotto.numbers = [
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 16],
      [1, 2, 3, 4, 15, 16],
    ];

    expect(checkResult(당첨_번호, lotto)).toEqual([1, 0, 1, 1, 0, 0]);
  });

  test("당첨 등수를 통해 누적 상금을 계산한다.", () => {
    expect(computeTotalPrize([1, 0, 1, 1, 0, 0])).toBe(2_001_550_000);
  });

  test("구입 금액과 총 상금을 이용해 수익률을 계산한다.", () => {
    const 구입_금액 = 8000;
    const 총_상금 = 5000;
    const ratio = calculateLottoProfitRatio(구입_금액, 총_상금);

    expect(ratio).toBe(60);
  });
});
