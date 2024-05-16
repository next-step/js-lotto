import {
  ErrorLottoBonusNumber,
  ErrorLottoNumber,
} from "../src/js/constants/error";
import LottoNumber from "../src/js/domain/LottoNumber";

describe("로또 번호 기능 테스트", () => {
  test("로또 번호는 1이상 45이하의 정수이다.", () => {
    // given
    const lottoNumber = 1;

    // when
    const validate = () => {
      LottoNumber.validateLottoNumber(lottoNumber);
    };

    // then
    expect(validate()).toBeUndefined();
  });

  test.each([
    {
      lottoNumber: "가나다",
      errorMessage: ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_NUMBER,
    },
    {
      lottoNumber: 0,
      errorMessage: ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_VALID_INTEGER,
    },
    {
      lottoNumber: 46,
      errorMessage: ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_VALID_INTEGER,
    },
  ])(
    "로또 번호가 정수가 아니거나 1미만 또는 45초과의 정수일 때 에러메시지를 출력한다.",
    (testSet) => {
      // given

      // when
      const validate = () => {
        LottoNumber.validateLottoNumber(testSet.lottoNumber);
      };

      // then
      expect(validate).toThrow(testSet.errorMessage);
    }
  );

  test("보너스 번호는 1 이상 45 미만의 정수이며 당첨 번호와 겹치지 않는다.", () => {
    // given
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    // when
    const validate = () => {
      LottoNumber.validateBonusNumber(bonusNumber, winningNumbers);
    };

    // then
    expect(validate()).toBeUndefined();
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
      // when
      const validate = () => {
        LottoNumber.validateBonusNumber(
          testSet.bonusNumber,
          testSet.winningNumbers
        );
      };

      // then
      expect(validate).toThrow(testSet.erroMessage);
    }
  );
});
