import {
  ErrorLottoBonusNumber,
  ErrorLottoNumber,
  ErrorLottoNumbers,
} from "../src/js/constants/error";
import LottoNumber from "../src/js/domain/LottoNumber";

describe("로또 번호 기능 테스트", () => {
  test("로또 번호가 문자열 또는 배열이 아니라면 에러가 발생한다", () => {
    // given
    const lottoNumbers = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
    };

    // when
    const validateLottoNumbers = () =>
      LottoNumber.validateLottoNumbers(lottoNumbers);

    // then
    expect(validateLottoNumbers).toThrow(
      ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_NOT_VALID_TYPE
    );
  });
  test("로또 번호 중 중복되는 수가 있다면 에러가 발생한다", () => {
    // given
    const lottoNumbers = "1,1,2,3,4,5";

    // when
    const validateLottoNumbers = () =>
      LottoNumber.validateLottoNumbers(lottoNumbers);

    // then
    expect(validateLottoNumbers).toThrow(
      ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_DUPLICATED
    );
  });

  test("한 개 이상의 로또 번호가 정수가 아니면 에러가 발생한다", () => {
    // given
    const lottoNumbers = "가나다,1,2,3,4,5";

    // when
    const validateLottoNumbers = () =>
      LottoNumber.validateLottoNumbers(lottoNumbers);

    // then
    expect(validateLottoNumbers).toThrow(
      ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_NUMBER
    );
  });

  test("한 개 이상의 로또 번호가  1 미만 또는 45 초과이면 로또가 정상적으로 생성되지 않는다.", () => {
    // given
    const lottoNumbers = "0,1,2,3,4,46";

    // when
    const validateLottoNumbers = () =>
      LottoNumber.validateLottoNumbers(lottoNumbers);

    // then
    expect(validateLottoNumbers).toThrow(
      ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_VALID_INTEGER
    );
  });

  test("로또 번호를 자동으로 랜덤 생성할 때, 생성되는 로또 번호는 1이상 45이하의 서로 다른 정수이다.", () => {
    // given
    const randomLottoNumbers = LottoNumber.generateRandomLottoNumbers();

    // when
    const validate = () => {
      LottoNumber.validateLottoNumbers(randomLottoNumbers);
    };

    // then
    expect(validate()).toBeUndefined();
  });

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
