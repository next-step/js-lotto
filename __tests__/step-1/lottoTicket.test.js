import hasDuplicate from "../../src/utils/hasDuplicate";
import LottoTicket from "../../src/domain/LottoTicket/LottoTicket";

describe("로또 티켓 테스트.", () => {
  it("하나의 로또는 중복된 값을 갖을 수 없다. ", () => {
    const makeLotto = LottoTicket.makeLotto();
    expect(hasDuplicate(makeLotto)).toBeFalsy();
  });
});
