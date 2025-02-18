import Lotto, { calculateLottoTicketLimit, buyLottos } from "../src/lotto";

describe("로또를 구매할때", () => {
  let lotto;

  beforeEach(() => {
    lotto = new Lotto(12700);
  });
  test("로또는 입력 받은 값을 예산으로 가진다", () => {
    expect(lotto.budget).toBe(12700);
  });
  test("로또는 예산 1000원당 1장씩 살 수 있다.", () => {
    expect(calculateLottoTicketLimit(lotto.budget)).toBe(12);
  });
  test("로또는 예산 1000원당 1장씩 살 수 있다.", () => {
    const 구입_가능한_횟수 = calculateLottoTicketLimit(lotto.budget);
    buyLottos(구입_가능한_횟수, lotto);
    expect(lotto.numbers.length).toBe(12);
  });
  test("로또는 한배열에 6개의 숫자를 가진다.", () => {
    lotto.makeLotto();

    expect(lotto.numbers[0].length).toBe(6);
    expect(lotto.numbers[0].every((num) => typeof num === "number")).toBe(true);
  });

  test("발행된 로또의 값들은 1 - 45까지의 값을 가진다.", () => {
    lotto.makeLotto();
    expect(lotto.numbers[0].every((value) => value >= 1 && value <= 45)).toBe(
      true
    );
  });
});
