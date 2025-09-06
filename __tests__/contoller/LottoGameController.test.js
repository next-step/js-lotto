import { ERROR_MESSAGE } from "../../src/constants/message.js";
import LottoGameController from "../../src/controller/LottoGameController.js";
import LottoService from "../../src/controller/LottoService.js";
import Lotto from "../../src/domain/Lotto.js";
import WinningNumbers from "../../src/domain/WinningNumbers.js";
import WinningRankCalculator from "../../src/utils/WinningRankCalculator.js";
import ConsoleView from "../../src/view/ConsoleView.js";

describe("ConsoleView에서 Lotto 사용자 입력에 대한 테스트", () => {
  let view;
  let lottoController;

  beforeEach(() => {
    view = new ConsoleView();
    lottoController = new LottoGameController(view);
  });

  test("구입 금액은 특수 문자를 입력할 수 없다.", () => {
    expect(() => {
      lottoController.amount = "8,000";
    }).toThrow(ERROR_MESSAGE.ONLY_NUMBER);
  });

  test("구입 금액 금액은 숫자를 제외한 문자는 들어갈 수 없다.", () => {
    expect(() => {
      lottoController.amount = "팔천원";
    }).toThrow(ERROR_MESSAGE.ONLY_NUMBER);
  });

  test("로또 최소 구매 가격은 1000원이다.", () => {
    expect(() => {
      lottoController.amount = 700;
    }).toThrow(ERROR_MESSAGE.MIN_PRICE);
  });
});

describe("ConsoleView에서 당첨 번호와 보너스 번호 입력에 대한 테스트", () => {
  let view;
  let lottoController;

  beforeEach(() => {
    view = new ConsoleView();
    lottoController = new LottoGameController(view);
  });

  test("당첨 번호는 6개 이상 입력할 수 없다.", () => {
    expect(() => {
      lottoController.winningNumbers = "1, 4, 10, 22, 34, 43, 44";
    }).toThrow(ERROR_MESSAGE.LOTTO_SIZE);
  });
  test("당첨 번호는 6개 미만 입력할 수 없다", () => {
    expect(() => {
      lottoController.winningNumbers = "1, 4, 10, 22, 34";
    }).toThrow(ERROR_MESSAGE.LOTTO_SIZE);
  });

  test("당첨 번호는 최소 1이상이어야 한다.", () => {
    expect(() => {
      lottoController.winningNumbers = "0, 4, 10, 22, 34, 37";
    }).toThrow(ERROR_MESSAGE.LOTTO_RANGE);
  });

  test("당첨 번호는 45를 초과할 수 없다.", () => {
    expect(() => {
      lottoController.winningNumbers = "0, 4, 10, 22, 34, 50";
    }).toThrow(ERROR_MESSAGE.LOTTO_RANGE);
  });

  test("보너스 번호는 하나의 숫자를 입력해야 한다.", () => {
    expect(() => {
      lottoController.bonusNumber = null;
    }).toThrow(ERROR_MESSAGE.EMPTY_INPUT);
  });

  test("보너스 번호는 숫자만 입력해야 한다..", () => {
    expect(() => {
      lottoController.bonusNumber = "a";
    }).toThrow(ERROR_MESSAGE.ONLY_NUMBER);
  });

  test("보너스 번호는 최소 1이상이어야 한다.", () => {
    expect(() => {
      lottoController.bonusNumber = "0";
    }).toThrow(ERROR_MESSAGE.LOTTO_RANGE);
  });

  test("보너스 번호는 45를 초과할 수 없다.", () => {
    expect(() => {
      lottoController.bonusNumber = 50;
    }).toThrow(ERROR_MESSAGE.LOTTO_RANGE);
  });

  test("보너스 번호는 당첨 번호와 중복될 수 없다.", () => {
    expect(() => {
      lottoController.winningNumbers = "1, 4, 10, 22, 34, 43";
      lottoController.bonusNumber = 1;
    }).toThrow(ERROR_MESSAGE.BONUS_DUPLICATE);
  });
});

describe("로또 번호와 당첨 번호 & 보너스 번호 비효 테스트", () => {
  let view;
  let lottoController;

  beforeEach(() => {
    view = new ConsoleView();
    lottoController = new LottoGameController(view);
  });

  test("로또 번호가 당첨 번호 6개와 모두 일치하면 1등이다.", () => {
    const winningNumbers = "1, 4, 10, 22, 34, 43";
    const bonusNumber = "13";
    const lotto = new Lotto([1, 4, 10, 22, 34, 43]);
    const winningLotto = new WinningNumbers(winningNumbers, bonusNumber);
    const rank = LottoService.calculateSingleLottoRank({ winningLotto, lotto });

    expect(rank).toBe(1);
  });

  test("로또 번호와 당첨 번호가 5개 일치하고 보너스 번호도 일치하면 2등이다.", () => {
    const winningNumbers = "1, 4, 10, 22, 34, 43";
    const bonusNumber = "13";
    const lotto = new Lotto([1, 4, 10, 22, 34, 13]);
    const winningLotto = new WinningNumbers(winningNumbers, bonusNumber);
    const rank = LottoService.calculateSingleLottoRank({ winningLotto, lotto });

    expect(rank).toBe(2);
  });

  test("로또 번호와 당첨 번호가 5개 일치하고 보너스 번호도 일치하지 않으면 3등이다.", () => {
    const winningNumbers = "1, 4, 10, 22, 34, 43";
    const bonusNumber = "13";
    const lotto = new Lotto([1, 4, 10, 22, 34, 45]);
    const winningLotto = new WinningNumbers(winningNumbers, bonusNumber);
    const rank = LottoService.calculateSingleLottoRank({ winningLotto, lotto });

    expect(rank).toBe(3);
  });
});
