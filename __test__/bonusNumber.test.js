import { readline } from "../src/utils/readline";
import { input } from "../src/view/console/input";

describe("보너스 번호 테스트", () => {
  test("보너스 번호를 입력 받는다.", async () => {
    jest.spyOn(readline, "question").mockImplementation(() => {
      return Promise.resolve(7);
    });

    const result = await input.bonusNumber();

    expect(result).toEqual(7);
  });

  
});
