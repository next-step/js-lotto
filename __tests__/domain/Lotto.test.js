import Lotto from "../../src/domain/Lotto/index.js";
import Ticket from "../../src/domain/Ticket/index.js";
import { getTicketAvailable } from "../../src/domain/Ticket/rule.js";
import ERROR_LOTTO from "../../src/domain/Lotto/error.js";

describe("Lotto 클래스 - 로또 게임 1판 ", () => {
  test("당첨 번호, 보너스 번호를 내부 상태로 가진다.", () => {
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

  test("당첨번호로 자연수 중 1이상 45이하 6개로 이루어진 배열이 들어오면, 로또의 당첨값이 된다.", () => {
    const expectedWinningNumber = [1, 2, 3, 4, 5, 6];
    const expectedBonusNumber = 7;
    const lotto = new Lotto({
      winningNumber: expectedWinningNumber,
      bonusNumber: expectedBonusNumber,
    });

    expect(lotto.getWinningNumber).toEqual(expectedWinningNumber);
  });

  test("당첨번호로 자연수 중 1이상 45이하 6개로 이루어진 배열이 들어오지 않으면, error를 throw한다.", () => {
    const expectedBonusNumber = 7;

    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const lotto = new Lotto({
        winningNumber: [0], // 경계값 - 1
        bonusNumber: expectedBonusNumber,
      });
    }).toThrow(ERROR_LOTTO.WRONG_WINNING_NUMBER_SETTING);
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const lotto = new Lotto({
        winningNumber: [46], // 경계값 + 1
        bonusNumber: expectedBonusNumber,
      });
    }).toThrow(ERROR_LOTTO.WRONG_WINNING_NUMBER_SETTING);
  });

  test("보너스 번호는 자연수 중 1이상 45이하인 수가 들어오면, 보너스 번호로 설정된다.", () => {
    const expectedWinningNumber = [1, 2, 3, 4, 5, 6];
    const expectedBonusNumber = 7;
    const lotto = new Lotto({
      winningNumber: expectedWinningNumber,
      bonusNumber: expectedBonusNumber,
    });
    expect(lotto.getBonusNumber).toBe(expectedBonusNumber);
  });

  test("보너스 번호는 자연수 중 1이상 45이하인 수가 들어오지 않으면, error를 출력한다.", () => {
    const expectedWinningNumber = [1, 2, 3, 4, 5, 6];

    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const lotto = new Lotto({
        winningNumber: expectedWinningNumber,
        bonusNumber: 0, // 경계값 - 1
      });
    }).toThrow(ERROR_LOTTO.WRONG_BONUS_NUMBER_SETTING);

    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const lotto = new Lotto({
        winningNumber: expectedWinningNumber,
        bonusNumber: 46, // 경계값 + 1
      });
    }).toThrow(ERROR_LOTTO.WRONG_BONUS_NUMBER_SETTING);
  });

  test("구입 금액에 맞춰 로또 번호를 여러 번 뽑을 수 있어야 한다.", () => {
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
