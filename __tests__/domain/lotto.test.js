import { Lotto } from "../../src/domain/lotto.js";

describe("Lotto", () => {
  it("숫자 형식의 배열이어야 합니다.", () => {
    // given
    const numbers = ["1", "2", "3", "4", "5"];

    // when    

    // then
    expect(() => new Lotto(numbers)).toThrow(TypeError)
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
});
