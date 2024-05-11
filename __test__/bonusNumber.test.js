import { OUTPUT_MESSAGE } from "../src/constants/message";
import { readline } from "../src/utils/readline";
import { isContainValidator } from "../src/validator/isContainValidator";
import { isNumberValidator } from "../src/validator/isNumberValidator";
import { input } from "../src/view/console/input";

describe("보너스 번호 테스트", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("보너스 번호를 입력 받는다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve(7);
    });

    const result = await input.bonusNumber();

    expect(result).toEqual(7);
  });

  test("보너스 번호는 당첨 번호와 중복되어서는 안된다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve(6);
    });

    const bonusNumber = await input.bonusNumber();
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    expect(() => isContainValidator(winningNumbers, bonusNumber)).toThrow(
      OUTPUT_MESSAGE.CONTAIN_ERROR
    );
  });
});
