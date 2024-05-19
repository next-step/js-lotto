import { ErrorLotto } from "../src/constants/error";
import Lotto from "../src/domain/Lotto";

describe("로또 기능", () => {
  test("로또 번호는 1-45사이의 정수이다", () => {
    expect(() => new Lotto([2, 9, 33, 34, 40, 55])).toThrow(
      ErrorLotto.OVER_MIN_MAX_NUMBER
    );
  });

  test("로또 번호가 6개 미만일 때, 에러를 발생한다", () => {
    expect(() => new Lotto([2, 9, 34, 40, 55])).toThrow(
      ErrorLotto.NUMBER_LENGTH_SIX
    );
  });
});
