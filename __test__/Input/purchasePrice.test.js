import { OUTPUT_MESSAGE } from "../../src/constants/message";
import { readline } from "../../src/utils/readline";
import { validateNonNegativeInteger } from "../../src/validator/validateNonNegativeInteger";
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

  test("구입금액은 0이상의 정수이어야 한다. 그 외의 값은 에러가 발생한다.", async () => {
    // jest.spyOn(readline, "question").mockImplementation(() => {
    //   return Promise.resolve("안녕"); // Simulate user input
    // });
    const stringResult = "안녕";
    const notIntegerResult = 2.5;
    const negativeResult = -1;

    expect(() => validateNonNegativeInteger(stringResult)).toThrow(OUTPUT_MESSAGE.NAN_ERROR);
    expect(() => validateNonNegativeInteger(notIntegerResult)).toThrow(OUTPUT_MESSAGE.INTEGER_ERROR);
    expect(() => validateNonNegativeInteger(negativeResult)).toThrow(OUTPUT_MESSAGE.NEGETIVE_NUM_ERROR);
  });
});
