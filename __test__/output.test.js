import { LOTTO } from "../src/constants/lotto";
import { Lotto } from "../src/js/domain/Lotto";
import { output } from "../src/view/console/output";

describe("출력 테스트", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation();
  });

  test("구입금액 만큼 로또를 출력한다.", () => {
    const lotto = new Lotto(LOTTO.UNIT_PRICE * 5);

    lotto.purchaseLottos();
    const lottos = lotto.lottos;
    output.lottos(lottos);

    expect(console.log).toHaveBeenCalledTimes(5);
  });
});
