import { LOTTO } from "../../src/constants/lotto";
import { OUTPUT_MESSAGE } from "../../src/constants/message";
import { readline } from "../../src/utils/readline";
import { validateArrNonNegativeInteger } from "../../src/validator/validateArrNonNegativeInteger";
import { validateArrLength } from "../../src/validator/validateArrLength";
import { validateArrDuplicate } from "../../src/validator/validateArrDuplicate";
import { input } from "../../src/view/console/input";
import { validateArrLimitNum } from "../../src/validator/validateArrLimitNum";

describe("당첨 번호 테스트", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("당첨번호를 입력 받는다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve("1, 2, 3, 4, 5, 6");
    });

    const winningNumbers = await input.winningLotto();

    expect(winningNumbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test(`당첨번호는 ${LOTTO.NUMBERS_COUNT}개를 입력해야한다. 그렇지 않으면 에러를 발생한다.`, async () => {
    const inputValue = Array.from({ length: LOTTO.NUMBERS_COUNT - 1 }, (_, i) => i + 1).join(", ");
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve(inputValue);
    });

    const winningNumbers = await input.winningLotto();

    expect(() => validateArrLength(winningNumbers)).toThrow(OUTPUT_MESSAGE.WINNING_LOTTO_LENGTH_ERROR);
  });

  test("당첨번호는 숫자만을 입력해야한다. 그렇지 않으면 에러를 발생한다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve("1, 2, 3, 4, 5, 안녕");
    });

    const winningNumbers = await input.winningLotto();

    expect(() => validateArrNonNegativeInteger(winningNumbers)).toThrow(OUTPUT_MESSAGE.NAN_ERROR);
  });

  test("당첨번호는 중복되게 입력할 수 없다. 그렇지 않으면 에러를 발생한다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve("1, 2, 3, 4, 4, 5");
    });

    const winningNumbers = await input.winningLotto();

    expect(() => validateArrDuplicate(winningNumbers)).toThrow(OUTPUT_MESSAGE.DUPLICATE_NUMBER_ERROR);
  });

  test("당첨번호는 음수를 입력할 수 없다. 그렇지 않으면 에러를 발생한다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve("1, 2, 3, 4, -1, 5");
    });

    const winningNumbers = await input.winningLotto();

    expect(() => validateArrNonNegativeInteger(winningNumbers)).toThrow(OUTPUT_MESSAGE.NEGETIVE_NUM_ERROR);
  });

  test("당첨번호는 소수를 입력할 수 없다. 그렇지 않으면 에러를 발생한다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve("1, 2, 3, 4, 1.5, 5");
    });

    const winningNumbers = await input.winningLotto();

    expect(() => validateArrNonNegativeInteger(winningNumbers)).toThrow(OUTPUT_MESSAGE.INTEGER_ERROR);
  });

  test(`당첨번호는 1부터 ${LOTTO.MAX_NUMBER}이하의 숫자를 입력해야한다. 그렇지 않으면 에러를 발생한다.`, async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve("1, 2, 3, 4, 46, 5");
    });

    const winningNumbers = await input.winningLotto();

    expect(() => validateArrLimitNum(winningNumbers)).toThrow(OUTPUT_MESSAGE.LIMIT_NUM_ERROR);
  });
});
