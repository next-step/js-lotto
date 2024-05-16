import { OUTPUT_MESSAGE } from "../../src/constants/message";
import { readline } from "../../src/utils/readline";
import { validateArrContainNum } from "../../src/validator/validateArrContainNum";
import { validateNonNegativeInteger } from "../../src/validator/validateNonNegativeInteger";
import { input } from "../../src/view/console/input";

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

    expect(() => validateArrContainNum(winningNumbers, bonusNumber)).toThrow(OUTPUT_MESSAGE.CONTAIN_ERROR);
  });

  test("보너스 번호는 숫자만을 입력해야한다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve("안녕");
    });

    const bonusNumber = await input.bonusNumber();

    expect(() => validateNonNegativeInteger(bonusNumber)).toThrow(OUTPUT_MESSAGE.NAN_ERROR);
  });
});
