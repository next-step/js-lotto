import Lotto from "../../src/domain/lotto";
import hasDuplicate from "../../src/utils/hasDuplicate";

const LOTTO_PRICE = 3000;

describe("로또 테스트.", () => {
  let price = LOTTO_PRICE;
  let lotto;

  beforeEach(() => {
    lotto = new Lotto(price);
  });

  it("로또 구입금액을 입력할 수 있다", () => {
    expect(lotto.price).toBe(price);
  });

  it("로또를 구입하면 구입 금액만큼 로또가 발행된다.", () => {
    expect(lotto.getLottoTicket()).toHaveLength(3);
  });

  it("하나의 로또의 숫자는 중복 될 수 없다 ", () => {
    lotto.makeLotto();
    expect(hasDuplicate(lotto.getLottoTicket()[0])).toBeFalsy();
  });
});
