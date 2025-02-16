import Lotto from "../../src/domain/Lotto";
import LottoTicket from "../../src/domain/LottoTicket";
import LOTTO_ERROR_MESSAGE from "../../src/utils/errorMessage/lottoErrorMessage";
import {
  LOTTO_MONEY,
  LOTTO_MONEY_ERROR,
  LOTTO_MONEY_MIN_ERROR,
} from "../../src/utils/ENUM/lotto";

describe("로또 테스트.", () => {
  let lotto;
  let money;
  describe("로또 발급이 정상적으로 이루어 졌을 때", () => {
    beforeEach(() => {
      money = LOTTO_MONEY;
      lotto = new Lotto(money, LottoTicket.makeLotto);
    });

    it("로또 구입금액을 입력할 수 있다", () => {
      expect(lotto.money).toBe(money);
    });

    it("로또를 구입하면 구입 금액만큼 로또가 발행된다.", () => {
      expect(lotto.getLottoTicket()).toHaveLength(4);
    });

    it("생성할 로또의 갯수를 입력하면 로또 티켓이 발급된다.", () => {
      const createLotto = lotto.makeLottoList(3, LottoTicket.makeLotto);

      expect(createLotto).toHaveLength(3);
    });
  });

  describe("로또 발급이 비 정상적으로 이루어 졌을 때", () => {
    it("로또 구입 금액이 1000원 단위 미만 (3500) 이면 에러를 발생 시킨다.", () => {
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
});
