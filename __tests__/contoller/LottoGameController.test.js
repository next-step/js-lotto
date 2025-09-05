import { ERROR_MESSAGE } from "../../src/constants/message.js";
import LottoGameController from "../../src/controller/LottoGameController.js";
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
});
