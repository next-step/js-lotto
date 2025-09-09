import { WinningLotto } from "../src/domain/WinningLotto.js";
import { LottoNumber } from "../src/domain/LottoNumber.js";
import { LottoShop } from "../src/domain/LottoShop.js";

describe(WinningLotto.name, () => {
  it("객체 생성시 값이 올바르게 반환됩니다.", () => {
    const winningNumber = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const winningLotto = WinningLotto.of({ winningNumber, bonusNumber });

    expect(winningLotto.value.lotto.value.map((n) => n.value)).toEqual(
      winningNumber
    );
    expect(winningLotto.value.bonusNumber.value).toBe(bonusNumber);
  });

  it(`당첨번호 개수가 ${LottoShop.LOTTO_NUMBER_COUNT}개가 아니면 에러가 발생합니다.`, () => {
    expect(() => WinningLotto.validateWinningNumber([1, 2, 3, 4, 5])).toThrow(
      `당첨 번호는 ${LottoShop.LOTTO_NUMBER_COUNT}개의 숫자로 이루어져야 합니다.`
    );
  });

  it("당첨번호에 숫자가 아닌 값이 있으면 에러가 발생합니다.", () => {
    expect(() =>
      WinningLotto.validateWinningNumber([1, 2, 3, 4, 5, "a"])
    ).toThrow("당첨 번호는 모두 숫자여야 합니다.");
  });

  it(`보너스번호가 ${LottoNumber.RANGE.MIN}~${LottoNumber.RANGE.MAX} 범위를 벗어나면 에러가 발생합니다.`, () => {
    expect(() => WinningLotto.validateBonusNumber(0)).toThrow(
      `로또 번호는 ${LottoNumber.RANGE.MIN}~${LottoNumber.RANGE.MAX} 사이여야 합니다. 입력값: 0`
    );
    expect(() => WinningLotto.validateBonusNumber(46)).toThrow(
      `로또 번호는 ${LottoNumber.RANGE.MIN}~${LottoNumber.RANGE.MAX} 사이여야 합니다. 입력값: 46`
    );
  });
});
