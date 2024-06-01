import LottoNumber from "../src/domain/LottoNumber";
import { PRIZE } from "../src/domain/Prize";
import { createLotto } from "./util/TestHelpler";
import WinningLotto from "../src/domain/WinningLotto";
import { ErrorLotto } from "../src/constants/error";

describe("로또 당첨 기능", () => {
  test("당첨번호는 보너스 번호와 중복이면, 에러를 발생한다.", () => {
    const winningLottoNumber = createLotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = new LottoNumber(5);

    expect(() => new WinningLotto(winningLottoNumber, bonusNumber)).toThrow(
      ErrorLotto.BONUS_NUMBER_DUPLICATED
    );
  });

  test("당첨번호가 6개 일치하면 1등이다", () => {
    // given
    const winningLottoNumber = createLotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = new LottoNumber(7);
    const lottoList = [winningLottoNumber];
    const winningLotto = new WinningLotto(winningLottoNumber, bonusNumber);

    // when
    const resultPrize = winningLotto.getResultPrize(lottoList);

    // then
    expect(resultPrize.length).toBe(1);
    expect(resultPrize[0]).toEqual(PRIZE.FIRST);
  });
});
