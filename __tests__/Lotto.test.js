import LOTTO from "../src/js/domain/lotto/lotto.constant.js";
import Lotto from "../src/js/domain/lotto/lotto.model.js";

describe("로또", () => {
  it(`로또는 ${LOTTO.COUNT_OF_NUMBERS}개의 번호를 가진다.`, () => {
    const lotto = new Lotto();

    expect(lotto.numbers.length).toBe(LOTTO.COUNT_OF_NUMBERS);
  });

  it(`번호는 ${LOTTO.MIN_NUMBER}부터 ${LOTTO.MAX_NUMBER}까지의 정수 값이다.`, () => {
    const lotto = new Lotto();

    expect(
      lotto.numbers.every(
        (number) => number >= LOTTO.MIN_NUMBER && number <= LOTTO.MAX_NUMBER,
      ),
    ).toBe(true);
  });

  it("번호는 중복되지 않는다.", () => {
    const lotto = new Lotto();

    expect(new Set(lotto.numbers).size).toBe(LOTTO.COUNT_OF_NUMBERS);
  });

  it("번호는 오름차순으로 정렬되어 있다.", () => {
    const lotto = new Lotto();

    expect(lotto.numbers).toEqual(lotto.numbers.sort((a, b) => a - b));
  });
});
