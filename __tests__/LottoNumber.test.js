import { LottoNumber } from "../src/domains/LottoNumber/index.js";

describe("로또 숫자는", () => {
  it("1~45 사이의 숫자가 아니면 에러를 반환한다", () => {
    expect(() => new LottoNumber(46)).toThrow(
      LottoNumber.ErrorMessages.OUT_OF_RANGE
    );
    expect(() => new LottoNumber(0)).toThrow(
      LottoNumber.ErrorMessages.OUT_OF_RANGE
    );
  });
});
