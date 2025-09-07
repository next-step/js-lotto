import {
  MAX_LOTTO_NUMBER_COUNT,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
  ERROR_MESSAGES,
} from "../src/domains/Lotto/constants/index.js";

import { Lotto } from "../src/domains/Lotto/index.js";

describe("로또는", () => {
  it("1~45 사이의 6개의 중복 없는 숫자를 가진다", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 45]);

    expect(new Set(lotto.numbers).size).toBe(MAX_LOTTO_NUMBER_COUNT);
  });

  it("6개의 숫자를 가지지 않으면 에러를 반환한다", () => {
    expect(() => new Lotto([1, 2, 3])).toThrow(ERROR_MESSAGES.INVALID_COUNT);
  });

  it("중복 숫자가 있으면 에러를 반환한다", () => {
    expect(() => new Lotto([1, 1, 2, 3, 4, 5])).toThrow(
      ERROR_MESSAGES.DUPLICATE_NUMBERS
    );
  });

  it("1~45 사이의 숫자가 아니면 에러를 반환한다", () => {
    expect(() => new Lotto([1, 2, 3, 4, 5, MAX_LOTTO_NUMBER + 1])).toThrow(
      ERROR_MESSAGES.OUT_OF_RANGE
    );
    expect(() => new Lotto([MIN_LOTTO_NUMBER - 1, 2, 3, 4, 5, 6])).toThrow(
      ERROR_MESSAGES.OUT_OF_RANGE
    );
  });
});
