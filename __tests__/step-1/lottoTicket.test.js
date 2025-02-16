import Lotto from "../../src/domain/Lotto";
import hasDuplicate from "../../src/utils/hasDuplicate";
import LottoTicket from "../../src/domain/LottoTicket";
import LottoResult from "../../src/domain/LottoResult";
import LottoStatistics from "../../src/domain/LottoStatistics";

describe("로또 티켓 테스트.", () => {
  it("하나의 로또는 중복된 값을 갖을 수 없다. ", () => {
    const lottoTicket = new LottoTicket();

    expect(hasDuplicate(lottoTicket)).toBeFalsy();
  });
});
