import { LOTTO } from "../src/constants/lotto";
import { OUTPUT_MESSAGE } from "../src/constants/message";
import { Lotto } from "../src/js/domain/Lotto";
import { readline } from "../src/utils/readline";
import { input } from "../src/view/console/input";
import { output } from "../src/view/console/output";

describe("IO 테스트", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("구입금액을 입력받는다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve(2000); // Simulate user input
    });

    const result = await input.purchasePrice();

    expect(result).toEqual(2000);
  });

  test("구입금액 만큼 로또를 출력한다.", () => {
    const lotto = new Lotto(LOTTO.UNIT_PRICE * 5);

    lotto.purchaseLottos();
    const lottos = lotto.lottos;
    output.lottos(lottos);

    expect(console.log).toHaveBeenCalledWith(lottos.pop());
  });
});
