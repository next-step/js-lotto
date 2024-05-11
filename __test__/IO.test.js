import { LOTTO } from "../src/constants/lotto";
import { readline } from "../src/utils/readline";
import { input } from "../src/view/console/input";

describe("IO 테스트", () => {
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
});
