import { LottoNumber } from "../src/domain/LottoNumber.js";

describe(LottoNumber.name, () => {
  it(`${LottoNumber.RANGE.MIN}~${LottoNumber.RANGE.MAX} 범위 밖의 값으로 생성 시 에러가 발생합니다.`, () => {
    expect(() => LottoNumber.of(0)).toThrow(
      `로또 번호는 ${LottoNumber.RANGE.MIN}~${LottoNumber.RANGE.MAX} 사이여야 합니다. 입력값: 0`
    );
    expect(() => LottoNumber.of(46)).toThrow(
      `로또 번호는 ${LottoNumber.RANGE.MIN}~${LottoNumber.RANGE.MAX} 사이여야 합니다. 입력값: 46`
    );
  });

  it("정상 범위의 값으로 생성 시 value가 올바르게 반환됩니다.", () => {
    const num = LottoNumber.of(10);
    expect(num.value).toBe(10);
  });

  it("equals: 값이 같으면 true, 다르면 false를 반환합니다.", () => {
    const num1 = LottoNumber.of(5);
    const num2 = LottoNumber.of(5);
    const num3 = LottoNumber.of(6);

    expect(num1.equals(num2)).toBe(true);
    expect(num1.equals(num3)).toBe(false);
  });
});
