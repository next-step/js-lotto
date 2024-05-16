import { OUTPUT_MESSAGE } from "../../src/constants/message";
import { readline } from "../../src/utils/readline";
import { validateNumber } from "../../src/validator/validateNumber";
import { input } from "../../src/view/console/input";

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

  test("구입금액은 숫자이어야 한다. 그렇지 않으면 에러가 발생한다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve("안녕"); // Simulate user input
    });

    const result = await input.purchasePrice();

    expect(() => validateNumber.nan(result)).toThrow(OUTPUT_MESSAGE.NAN_ERROR);
  });

  test("구입금액은 0보다 커야 한다. 그렇지 않으면 에러가 발생한다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve(-1); // Simulate user input
    });

    const result = await input.purchasePrice();

    expect(() => validateNumber.negative(result)).toThrow(OUTPUT_MESSAGE.NEGETIVE_NUM_ERROR);
  });

  test("구입금액은 정수여야 한다. 그렇지 않으면 에러가 발생한다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve(1.1); // Simulate user input
    });

    const result = await input.purchasePrice();

    expect(() => validateNumber.integer(result)).toThrow(OUTPUT_MESSAGE.INTEGER_ERROR);
  });
});
