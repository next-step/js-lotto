import Lotto, { calculateLottoProfitRatio } from "../src/lotto";

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

  test("인스턴스에 당첨 횟수와 랭크가 저장된다.", () => {
    lotto.saveLottoResults(1);

    expect(lotto.result).toEqual({
      1: 1,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    });
  });

  test("누적 상금을 계산한다.", () => {
    lotto.saveLottoResults(1);
    lotto.saveLottoResults(5);
    lotto.computeTotalPrize();

    expect(lotto.prizeAmount).toBe(2000005000);
  });

  test("구입 금액과 총 상금을 이용해 수익률을 계산한다.", () => {
    const 구입_금액 = 8000
    const 총_상금 = 5000
    const ratio = calculateLottoProfitRatio(구입_금액, 총_상금);

    expect(ratio).toBe(60);
  });
});
