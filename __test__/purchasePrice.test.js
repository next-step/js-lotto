import { OUTPUT_MESSAGE } from "../src/constants/message";
import { readline } from "../src/utils/readline";
import { isIntegerValidator } from "../src/validator/isIntegerValidator";
import { input } from "../src/view/console/input";

describe("구입 금액 테스트", () => {
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

  test("구입금액은 숫자만을 입력해야 한다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve("안녕"); // Simulate user input
    });

    const result = await input.purchasePrice();

    expect(() => isIntegerValidator(result)).toThrow(OUTPUT_MESSAGE.NAN_ERROR);
  });
});
