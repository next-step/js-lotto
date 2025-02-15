import Lotto from "../../src/domain/Lotto";
import hasDuplicate from "../../src/utils/hasDuplicate";
import LottoTicket from "../../src/domain/LottoTicket";
import LottoResult from "../../src/domain/LottoResult";
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

  it("하나의 로또의 숫자는 중복 될 수 없다 ", () => {
    const lottoTicket = new LottoTicket();

    expect(hasDuplicate(lottoTicket)).toBeFalsy();
  });

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

describe("로또 당첨 결과 테스트", () => {
  let money = LOTTO_MONEY;
  let lotto;
  const winningNumbers = [23, 33, 11, 22, 55];
  const bonusNumber = 1;

  const userChoiceNumber = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
  ];

  let compareNumberResult = [
    { ticket: [1, 2, 3, 4, 5, 6], matchedNumbers: [], hasBonus: true },
    { ticket: [7, 8, 9, 10, 11, 12], matchedNumbers: [11], hasBonus: false },
    { ticket: [13, 14, 15, 16, 17, 18], matchedNumbers: [], hasBonus: false },
  ];

  beforeEach(() => {
    lotto = new Lotto(money, LottoTicket);
  });
  it("당첨 번호와 사용자의 번호를 비교한다.", () => {
    const lottoResult = new LottoResult(winningNumbers, bonusNumber);

    jest.spyOn(lotto, "getLottoTicket").mockReturnValue(userChoiceNumber);

    expect(lottoResult.compareNumber(lotto.getLottoTicket())).toEqual(
      compareNumberResult
    );
  });
});
