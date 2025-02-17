import Lotto from "../../src/domain/Lotto";
import LottoTicket from "../../src/domain/LottoTicket";
import LOTTO_ERROR_MESSAGE from "../../src/utils/errorMessage/lottoErrorMessage";
import {
  LOTTO_MONEY,
  LOTTO_MONEY_ERROR,
  LOTTO_MONEY_MIN_ERROR,
} from "../../src/utils/ENUM/lotto";

describe("로또를 구매할 때.", () => {
  it("구입 금액이 1,000원 단위이면서 최소금액 이상인 경우 (입력된금액 / 로또 한장 금액) 만큼의 로또가 발행 된다.", () => {
    const lotto = new Lotto(LOTTO_MONEY, LottoTicket.makeLotto);

    const createLotto = lotto.generateTickets(LottoTicket.makeLotto);

    expect(createLotto).toHaveLength(4);
  });

  it("로또 구입 금액이 1,000 단위가 아니라면 ex-(3500) 이면 에러를 throw 한다.", () => {
    expect(() => new Lotto(LOTTO_MONEY_ERROR, LottoTicket.makeLotto)).toThrow(
      LOTTO_ERROR_MESSAGE.INVALID_ORDER_AMOUNT_UNIT
    );
  });

  it("로또 구입 금액이 최소금액보다 낮으면 에러를 발생 시킨다.", () => {
    expect(
      () => new Lotto(LOTTO_MONEY_MIN_ERROR, LottoTicket.makeLotto)
    ).toThrow(LOTTO_ERROR_MESSAGE.MIN_ORDER_AMOUNT);
  });

  it("로또 발급을 담당하는 클래스를 넘겨주지 않으면 에러를 발생 시킨다.", () => {
    expect(() => new Lotto(LOTTO_MONEY)).toThrow(
      LOTTO_ERROR_MESSAGE.LOTTO_ISSUANCE_ERROR
    );
  });
});
