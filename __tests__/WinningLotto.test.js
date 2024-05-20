import {
  ErrorLottoBonusNumber,
  ErrorLottoNumber,
} from "../src/js/constants/error";
import Lotto from "../src/js/domain/Lotto";
import WinningLotto from "../src/js/domain/WinningLotto";

describe("당첨 로또 기능 테스트", () => {
  test("보너스 번호는 1 이상 45 미만의 정수이며 당첨 번호와 겹치지 않는다.", () => {
    // given
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    const bonusNumber = 7;

    // when
    const winningLotto = new WinningLotto(lotto, bonusNumber);

    // then
    expect(winningLotto.winningLotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
    expect(winningLotto.bonusNumber.value).toEqual(7);
  });

  test.each([
    [
      {
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 6,
        erroMessage: ErrorLottoBonusNumber.ERROR_LOTTO_BONUS_NUMBER_DUPLICATED,
      },
      {
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 56,
        erroMessage: ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_VALID_INTEGER,
      },
      {
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: "가나다",
        erroMessage: ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_NUMBER,
      },
    ],
  ])(
    "보너스 번호가 1 미만 45 초과의 정수이거나 당첨 번호와 겹치면 에러메시지를 출력한다.",
    (testSet) => {
      // given
      const bonusNumber = testSet.bonusNumber;
      const lotto = new Lotto(testSet.winningNumbers);

      // when

      const generateWinningLotto = () => {
        const winningLotto = new WinningLotto(lotto, bonusNumber);
      };

      // then
      expect(generateWinningLotto).toThrow(testSet.erroMessage);
    }
  );
});
