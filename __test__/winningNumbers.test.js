import { LOTTO } from "../src/constants/lotto";
import { OUTPUT_MESSAGE } from "../src/constants/message";
import { convertNumbersToArray } from "../src/utils/convertNumbersToArray";
import { readline } from "../src/utils/readline";
import { hasNumberValidator } from "../src/validator/hasNumberValidator";
import { isArrLengthValidator } from "../src/validator/isArrLengthValidator";
import { isNumberValidator } from "../src/validator/isNumberValidator";
import { input } from "../src/view/console/input";

describe("당첨 번호 테스트", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("당첨번호를 입력 받는다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve("1, 2, 3, 4, 5, 6");
    });

    const result = await input.winningLotto();

    expect(result).toEqual(convertNumbersToArray("1, 2, 3, 4, 5, 6"));
  });

  test(`당첨번호는 ${LOTTO.NUMBERS_COUNT}개를 입력해야한다. 그렇지 않으면 에러를 발생한다.`, async () => {
    const result = Array.from(
      { length: LOTTO.NUMBERS_COUNT - 1 },
      (_, i) => i + 1
    );

    expect(() => isArrLengthValidator(result)).toThrow(
      OUTPUT_MESSAGE.WINNING_LOTTO_LENGTH_ERROR
    );
  });

  test("당첨번호는 숫자만을 입력해야한다. 그렇지 않으면 에러를 발생한다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve("1, 2, 3, 4, 5, 안녕");
    });

    const winningNumbers = await input.winningLotto();

    expect(() => hasNumberValidator(winningNumbers)).toThrow(
      OUTPUT_MESSAGE.NAN_ERROR
    );
  });
});
