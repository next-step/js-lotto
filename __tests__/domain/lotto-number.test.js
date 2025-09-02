import { LottoNumber } from "../../src/domain/lotto-number.js";

describe("LottoNumber", () => {
  it("1 미만의 숫자는 에러가 발생합니다.", () => {
    // given
    const lottoNumber = 0;

    // when

    // then
    expect(() => new LottoNumber(lottoNumber)).toThrow();
  });
  it("45를 초과하는 숫자는 에러가 발생합니다.", () => {
    // given
    const lottoNumber = 0;

    // when

    // then
    expect(() => new LottoNumber(lottoNumber)).toThrow();
  });
});
