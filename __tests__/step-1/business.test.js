// - [] view logic 과 business logic 은 철저하게 분리한다.
// - [] 로또 구입 금액을 입력할 수 있다.
// - [] 로또를 구입하면 구입 금액에 해당하는 로또를 발행한다.
// - [] 로또 1장의 가격은 1,000원 이다.
// - [] 당첨 번호와 보너스 번호를 입력 받을수 있다.
// - []
import Lotto from "../../src/domain/lotto";
import hasDuplicate from "../../src/utils/hasDuplicate";
describe("로또 테스트.", () => {
  it("로또 구입금액을 입력할 수 있다", () => {
    // given
    const price = 1000;
    const lotto = new Lotto(price);

    expect(lotto.price).toBe(price);
  });

  it("로또를 구입하면 구입 금액만큼 로또가 발행된다.", () => {
    const price = 3000;
    const lotto = new Lotto(price);
    expect(lotto.getLottoTicket()).toHaveLength(3);
  });

  it("하나의 로또의 숫자는 중복 될 수 없다 ", () => {
    const price = 1000;
    const lotto = new Lotto(price);

    lotto.makeLotto();
    expect(hasDuplicate(lotto.getLottoTicket()[0])).toBeFalsy();
  });
});
