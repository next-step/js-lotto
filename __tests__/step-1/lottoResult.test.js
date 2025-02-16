import Lotto from "../../src/domain/Lotto";
import hasDuplicate from "../../src/utils/hasDuplicate";
import LottoTicket from "../../src/domain/LottoTicket";
import LottoResult from "../../src/domain/LottoResult";
import LottoStatistics from "../../src/domain/LottoStatistics";

describe("로또 테스트.", () => {
  it("당첨 번호와 보너스 번호를 입력 받을 수 있다.", () => {
    const winningNumbers = [23, 33, 11, 22, 55];
    const bonusNumber = 1;
    const lottoResult = new LottoResult(winningNumbers, bonusNumber);

    expect(lottoResult.getWinnersNumber()).toEqual({
      winningNumbers,
      bonusNumber,
    });
  });
});
