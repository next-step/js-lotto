import { LOTTO } from "../../src/constants/lotto";
import { OUTPUT_MESSAGE } from "../../src/constants/message";
import { readline } from "../../src/utils/readline";
import { validateArray } from "../../src/validator/validateArray";
import { validateNumber } from "../../src/validator/validateNumber";

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

    expect(() => validateArray.containNum(winningNumbers, bonusNumber)).toThrow(OUTPUT_MESSAGE.CONTAIN_ERROR);
  });

  test("보너스 번호는 숫자만을 입력해야한다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve("안녕");
    });

    const bonusNumber = await input.bonusNumber();

    expect(() => validateNumber.nan(bonusNumber)).toThrow(OUTPUT_MESSAGE.NAN_ERROR);
  });

  test("보너스 번호는 음수를 입력할 수 없다. 그렇지 않으면 에러를 발생한다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve(-1);
    });

    const bonusNumber = await input.bonusNumber();

    expect(() => validateNumber.negative(bonusNumber)).toThrow(OUTPUT_MESSAGE.NEGETIVE_NUM_ERROR);
  });

  test(`보너스 번호가 ${LOTTO.MAX_NUMBER}을 초과하면 에러를 발생한다.`, async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve(46);
    });

    const bonusNumber = await input.bonusNumber();

    expect(() => validateNumber.max(bonusNumber)).toThrow(OUTPUT_MESSAGE.LIMIT_NUM_ERROR);
  });
});
