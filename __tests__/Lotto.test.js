import { ERROR_CODES } from "../src/constants/error";
import { Lotto } from "../src/domain/Lotto";

describe("로또 테스트", () => {
  test("로또 1장의 가격은 1,000원이다.", () => {
    // give
    const price = Lotto.PRICE;

    // when + then
    expect(price).toBe(1000);
  });

  test("6개의 중복되지 않는 숫자로 생성한다.", () => {
    // give
    const lotto1 = () => new Lotto([1, 2, 3, 4, 5, 5]);
    const lotto2 = () => new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto3 = () => new Lotto([1, 2, 3, 4, 5]);

    // when + then
    expect(lotto1).toThrow(ERROR_CODES.ERROR_DUPLICATE_NUMBER);
    expect(lotto2).not.toThrow();
    expect(lotto3).toThrow(ERROR_CODES.ERROR_INVALID_LENGTH);
  });

  test("로또의 번호는 1~45까지의 자연수이다.", () => {
    [0, -1, "a"].forEach((input) => {
      // give
      const lotto = () => new Lotto([1, 2, 3, 4, 5, input]);

      // when + then
      expect(lotto).toThrow(ERROR_CODES.ERROR_INVALID_NUMBER);
    });
  });
});
