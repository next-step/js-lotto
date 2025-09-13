import { Lotto } from "../src/domains/Lotto/index.js";

describe("로또는", () => {
  it("1~45 사이의 6개의 중복 없는 숫자를 가진다", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 45]);

    expect(lotto.numbers.size).toBe(Lotto.SIZE);
  });

  it("6개의 중복되지 않은 숫자를 가지지 않으면 에러를 반환한다", () => {
    expect(() => new Lotto([1, 2, 3])).toThrow(
      Lotto.ErrorMessages.INVALID_LOTTO_NUMBERS
    );
    expect(() => new Lotto([1, 1, 2, 3, 4, 5])).toThrow(
      Lotto.ErrorMessages.INVALID_LOTTO_NUMBERS
    );
  });
});
