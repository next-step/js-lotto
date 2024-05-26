import { ErrorLotto } from "../src/constants/error";
import Lotto from "../src/domain/Lotto";
import LottoNumber from "../src/domain/LottoNumber";
import { createLotto } from "./util/TestHelpler";

describe("로또 기능", () => {
  test("두개의 로또 번호가 4개가 같으면 그 갯수를 리턴한다", () => {
    const lottoOne = createLotto([1, 2, 3, 5, 6, 7]);
    const lottoTwo = createLotto([1, 2, 3, 5, 16, 17]);

    const resultMatchCount = lottoOne.getMatchCount(lottoTwo);

    expect(resultMatchCount).toBe(4);
  });

  test("로또에서 보너스번호가 포함하는지 확인한다", () => {
    const lottoOne = createLotto([1, 2, 3, 5, 6, 7]);
    const number = new LottoNumber(7);

    const resultMatchCount = lottoOne.isIncludeLottoNumber(number);
    expect(resultMatchCount).toEqual(true);
  });

  test("로또 번호가 6개 미만일 때, 에러를 발생한다", () => {
    expect(() => new Lotto([2, 9, 34, 40, 55])).toThrow(
      ErrorLotto.NUMBER_LENGTH_SIX
    );
  });

  test("로또 번호가 중복될때, 에러를 발생한다", () => {
    expect(() => new Lotto([2, 9, 34, 34, 40, 41])).toThrow(
      ErrorLotto.NUMBER_DUPLICATED
    );
  });
});
