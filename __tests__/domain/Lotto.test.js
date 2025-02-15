import Lotto from "../../src/domain/Lotto/index.js";
import Ticket from "../../src/domain/Ticket.js";
import { LOTTO_RULES, getTicketAvailable } from "../../src/util/rule.js";
import { ERROR_LOTTO } from "../../src/util/error.js";
describe("Lotto 클래스 - 로또 게임 1판 ", () => {
  test("당첨 번호, 보너스 번호를 내부 상태값으로 가진다.", () => {
    const lotto = new Lotto({
      winningNumber: [1, 2, 3, 4, 5, 6],
      bonusNumber: 1,
    });

    const actualLotto = {
      winningNumber: [1, 2, 3, 4, 5, 6],
      bonusNumber: 1,
    };

    expect(actualLotto.winningNumber).toEqual(lotto.getWinningNumber);
    expect(actualLotto.bonusNumber).toEqual(lotto.getBonusNumber);
  });

  test("구입금액은 1000원 이상, 100000 이하로만 가능하고 당첨번호는 자연수 중 1이상 45이하 6개로 이루어진 배열이고, 보너스 번호는 자연수 중 1이상 45이하인 수다.", () => {
    const lotto = new Lotto({});

    expect(() => {
      lotto.setWinningNumber(
        -1,
        LOTTO_RULES.winningNumberRule,
        ERROR_LOTTO.WRONG_WINNING_NUMBER_SETTING,
      );
    }).toThrow(ERROR_LOTTO.WRONG_WINNING_NUMBER_SETTING);

    expect(() => {
      lotto.setBonusNumber(
        -1,
        LOTTO_RULES.bonusNumberRule,
        ERROR_LOTTO.WRONG_BONUS_NUMBER_SETTING,
      );
    }).toThrow(ERROR_LOTTO.WRONG_BONUS_NUMBER_SETTING);
  });

  test("로또 Ticket 객체를 발행해야 한다 (구입 금액에 해당하는 만큼).", () => {
    const result = getTicketAvailable(2000);

    expect(result).toBe(2);
  });

  test("사용자가 구매한 로또 번호와 당첨 번호를 비교한다.", () => {
    const lotto = new Lotto({
      purchasePrice: 2000,
      winningNumber: [1, 2, 3, 4, 5, 45],
      bonusNumber: 1,
    });

    const ticket1 = new Ticket({
      numbers: [1, 2, 3, 4, 5, 45],
    });
    const result = new Set([...lotto.getWinningNumber, ...ticket1.getNumbers]);

    expect(result.size).toBe(6);
  });
});
