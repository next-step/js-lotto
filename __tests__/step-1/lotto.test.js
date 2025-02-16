import Lotto from "../../src/domain/Lotto";
import hasDuplicate from "../../src/utils/hasDuplicate";
import LottoTicket from "../../src/domain/LottoTicket";
import LottoResult from "../../src/domain/LottoResult";
import LottoStatistics from "../../src/domain/LottoStatistics";

const LOTTO_MONEY = 3000;

describe("로또 테스트.", () => {
  let money = LOTTO_MONEY;
  let lotto;

  beforeEach(() => {
    lotto = new Lotto(money, LottoTicket);
  });

  it("로또 구입금액을 입력할 수 있다", () => {
    expect(lotto.money).toBe(money);
  });

  it("로또를 구입하면 구입 금액만큼 로또가 발행된다.", () => {
    expect(lotto.getLottoTicket()).toHaveLength(3);
  });
});
