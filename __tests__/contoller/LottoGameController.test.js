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

  test("사용자는 금액에 특수 문자는 들어갈 수 없다.", () => {
    expect(() => {
      lottoController.amount = "8,000";
    }).toThrow(ERROR_MESSAGE.ONLY_NUMBER);
  });

  test("사용자는 금액에 숫자를 제외한 문자는 들어갈 수 없다.", () => {
    expect(() => {
      lottoController.amount = "팔천원";
    }).toThrow(ERROR_MESSAGE.ONLY_NUMBER);
  });
  test("로또 최소 구매 가격은 1,000원이다.", () => {
    expect(() => {
      lottoController.amount = 700;
    }).toThrow(ERROR_MESSAGE.MIN_PRICE);
  });
});
