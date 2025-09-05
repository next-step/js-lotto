import { LottoNumber } from "../../src/domain/lotto-number.js";

describe("LottoNumber", () => {
  it("number 타입이어야 합니다.", () => {
    // given
    const lottoNumber = "1";

    // when

    // then
    expect(() => new LottoNumber(lottoNumber)).toThrow(TypeError);
  });
  it("1 미만의 숫자는 에러가 발생합니다.", () => {
    // given
    const lottoNumber = 0;

    // when

    // then
    expect(() => new LottoNumber(lottoNumber)).toThrow(RangeError);
  });
  it("45를 초과하는 숫자는 에러가 발생합니다.", () => {
    // given
    const lottoNumber = 46;

    // when

    // then
    expect(() => new LottoNumber(lottoNumber)).toThrow(RangeError);
  });
  it("소수점이 있는 숫자를 입력하면 에러가 발생합니다.", () => {
    // given
    const lottoNumber = 4.5;

    // when

    // then
    expect(() => new LottoNumber(lottoNumber)).toThrow(RangeError);
  });
});
