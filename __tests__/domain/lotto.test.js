import { Lotto } from "../../src/domain/lotto.js";

describe("Lotto", () => {
  it("숫자 형식의 배열이어야 합니다.", () => {
    // given
    const numbers = ["1", "2", "3", "4", "5"];

    // when

    // then
    expect(() => new Lotto(numbers)).toThrow(TypeError);
  });
  it("6개 미만의 숫자로 구성되면 오류가 발생합니다.", () => {
    // given
    const numbers = [1, 2, 3, 4, 5];

    // when

    // then
    expect(() => new Lotto(numbers)).toThrow(RangeError);
  });
  it("6개를 초과하는 숫자로 구성되면 오류가 발생합니다.", () => {
    // given
    const numbers = [1, 2, 3, 4, 5, 6, 7];

    // when

    // then
    expect(() => new Lotto(numbers)).toThrow(RangeError);
  });
  it("6개 미만의 숫자들로 구성된 문자열로 로또를 생성하면 오류가 발생합니다.", () => {
    // given
    const numbers = "1,2,3,4,5";

    // when

    // then
    expect(() => Lotto.from(numbers)).toThrow(RangeError);
  });
  it("6개를 초과하는 숫자들로 구성된 문자열로 로또를 생성하면 오류가 발생합니다.", () => {
    // given
    const numbers = "1,2,3,4,5,6,7";

    // when

    // then
    expect(() => Lotto.from(numbers)).toThrow(RangeError);
  });
  it("유효하지 않은 형식으로 구성된 문자열로 로또를 생성하면 오류가 발생합니다.", () => {
    // given
    const numbers = [
      "",
      ",,,,,,",
      "1,,,,2,",
      "1,2,3,Infinity,5,6",
      "1,2,3,4.5,5,6",
      "1,2,3,-4,5,6",
      "1,2,3,1e2,5,6",
    ];
    // when

    // then
    numbers.forEach((number) => {
      expect(() => Lotto.from(number)).toThrow();
    });
  });
});
