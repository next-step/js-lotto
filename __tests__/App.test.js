import { App } from "../src/App";
import { ERROR_CODES } from "../src/constants/error";

describe("로또 게임 테스트", () => {
  let app;
  let price;

  beforeEach(() => {
    // given
    app = new App();
    price = 8000;
  });

  test("구입 금액에 해당하는 만큼 로또를 발행한다.", () => {
    // when
    const count = app.getLottoCount(price);

    // then
    expect(count).toBe(8);
  });

  test("구입 금액이 로또 금액보다 작으면 발행을 실패한다.", () => {
    // given
    price = 800;

    const count = () => app.buyLotto(price);

    // when + then
    expect(count).toThrow(ERROR_CODES.ERROR_AMOUNT_TOO_SMALL);
  });
});
