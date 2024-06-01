import { ErrorLotto } from "../src/constants/error";
import LottoNumber from "../src/domain/LottoNumber";

describe("로또넘버 테스트", () => {
  test("46의 숫자가 주어졌을떄, 로또번호를 생성하면, 에러가 발생한다", () => {
    const overNumber = 46;
    expect(() => new LottoNumber(overNumber)).toThrow(
      ErrorLotto.OVER_MIN_MAX_NUMBER
    );
  });

  test("1-45사이의 숫자가 주어졌을 때, 로또번호를 생성하면, 정상동작 한다.", () => {
    const rightNumber = 33;
    const lottoNumber = new LottoNumber(rightNumber);
    expect(lottoNumber.number).toBe(rightNumber);
  });
});
