import { ErrorLotto } from "../src/constants/error";
import WinningLotto from "../src/domain/WinningLotto";

describe("로또 당첨 기능", () => {
  test("보너스 번호는 1-45사이의 정수이다", () => {
    expect(() => new WinningLotto([2, 9, 33, 34, 40, 41], 55)).toThrow(
      ErrorLotto.BONUS_NUMBER_OVER_MIN_MAX
    );
  });

  test("로또 당첨 번호는 보너스 번호와 중복되지 않는다", () => {
    expect(() => new WinningLotto([2, 9, 33, 34, 40, 41], 2)).toThrow(
      ErrorLotto.BONUS_NUMBER_DUPLICATED
    );
  });
});
