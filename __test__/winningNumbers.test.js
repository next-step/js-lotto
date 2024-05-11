import { convertNumbersToArray } from "../src/utils/convertNumbersToArray";
import { readline } from "../src/utils/readline";
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
});
