import Lotto, { getProfitRate } from "../src/lotto";
import { getReward } from "../src/getRank.js";

describe("로또를 구매할때", () => {
  let lotto;

  beforeEach(() => {
    lotto = new Lotto(12700);
  });

  test("로또는 전달받은 금액을 1000원으로 나눈 값의 몫만큼 발행된다.", () => {
    expect(lotto.count).toBe(12);
  });

  test("로또는 전달받은 금액을 1000원으로 나눈 값의 몫만큼 발행된다.", () => {
    const prevLottoNumbersCount = lotto.numbers.length;
    lotto.makeLotto();

    expect(lotto.numbers.length).toBe(prevLottoNumbersCount + 1);
  });

  test("로또는 한배열에 6개의 정수를 가진다.", () => {
    lotto.makeLotto();
    expect(lotto.numbers[0].length).toBe(6);
  });

  test("발행된 로또의 값들은 1 - 99까지의 값을 가진다.", () => {
    lotto.makeLotto();
    expect(lotto.numbers[0].every((value) => value >= 1 && value < 100)).toBe(
      true
    );
  });
});

describe("로또를 사고 당첨 번호도 입력한 이후", () => {
  let lotto;

  beforeEach(() => {
    lotto = new Lotto(8000);
  });

  test("상금이 누적된다.", () => {
    let initalAmount = lotto.amount;
    const first = getReward(1);
    lotto.addAmountFromWinningPrize(first);

    expect(lotto.amount).toBe(initalAmount + first);
  });

  test("누적 상금과 구입 금액을 통해 수익률을 계산한다.", () => {
    const prize = getReward(5);
    lotto.addAmountFromWinningPrize(prize);

    expect(getProfitRate(lotto.amount, lotto.paymentAmount)).toBe(0.625);
  });
});
