import WinningLotto from "../src/domain/WinningLotto";

describe("로또 입력 기능", () => {
  test("로또 한장 가격은 1,000원이다", () => {});

  test("당첨 번호는 1-45사이의 정수이다", () => {
    expect(() => new WinningLotto([2, 9, 33, 34, 40, 55], 7)).toThrow(
      Error.OVER_MIN_MAX_NUMBER
    );
  });

  test("로또 당첨 번호는 보너스 번호와 중복되지 않는다", () => {
    expect(() => new WinningLotto([2, 9, 33, 34, 40, 41], 2)).toThrow(
      Error.BONUS_NUMBER_DUPLICATED
    );
  });

  test("입력받은 금액 만큼 로또를 발행한다", () => {});
});
