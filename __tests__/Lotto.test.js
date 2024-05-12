import {
  ErrorLottoNumber,
  ErrorLottoNumbers,
  ErrorLottoPurchasedAmount,
} from "../src/js/constants/error";
import Lotto from "../src/js/domain/Lotto";

describe("로또 기능 테스트", () => {
  test("로또 번호가 서로 다른 1이상 45이하의 정수 6개이면 로또가 정상적으로 생성된다.", () => {
    // given
    const lotto = new Lotto("1,2,3,4,5,6");

    // when
    const lottoNumbers = lotto.numbers;

    // then
    expect(lottoNumbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("로또 번호 중 중복되는 수가 있다면 에러가 발생한다", () => {
    // given
    const lottoNumbers = "1,1,2,3,4,5";

    // when
    const validateLottoNumbers = () => Lotto.validateLottoNumbers(lottoNumbers);

    // then
    expect(validateLottoNumbers).toThrow(
      ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_DUPLICATED
    );
  });

  test("한 개 이상의 로또 번호가 정수가 아니면 에러가 발생한다", () => {
    // given
    const lottoNumbers = "가나다,1,2,3,4,5";

    // when
    const validateLottoNumbers = () => Lotto.validateLottoNumbers(lottoNumbers);

    // then
    expect(validateLottoNumbers).toThrow(
      ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_NUMBER
    );
  });

  test("한 개 이상의 로또 번호가  1 미만 또는 45 초과이면 로또가 정상적으로 생성되지 않는다.", () => {
    // given
    const lottoNumbers = "0,1,2,3,4,46";

    // when
    const validateLottoNumbers = () => Lotto.validateLottoNumbers(lottoNumbers);

    // then
    expect(validateLottoNumbers).toThrow(
      ErrorLottoNumber.ERROR_LOTTO_NUMBER_NOT_VALID_INTEGER
    );
  });

  test("로또 번호를 자동으로 랜덤 생성할 때, 생성되는 로또 번호는 1이상 45이하의 서로 다른 정수이다.", () => {
    // given
    const randomLottoNumbers = Lotto.generateRandomLottoNumbers();

    // when
    const validate = () => {
      Lotto.validateLottoNumbers(randomLottoNumbers);
    };

    // then
    expect(validate()).toBeUndefined();
  });

  test.each([
    [0, 0],
    [1_000, 1],
    [1_001, 1],
    [10_000.1, 10],
  ])(
    "로또를 구입한 금액이 0 이상인 경우 로또를 구매한 금액이 %s 이면, 발행하는 로또의 개수는 %s이다.",
    (purchasedAmount, lottoCount) => {
      // given

      // when
      const availableLottoCount = Lotto.getAvailableLottoCount(purchasedAmount);

      // then
      expect(availableLottoCount).toBe(lottoCount);
    }
  );

  test.each([
    [
      "가나다",
      ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_NUMBER,
    ],
    [-1, ErrorLottoPurchasedAmount.ERROR_LOTTO_PURCHASED_AMOUNT_NOT_POSITIVE],
  ])(
    "로또를 구입한 금액이 0 미만이거나 숫자가 아닐 경우 에러가 발생한다.",
    (purchasedAmount, errorMessage) => {
      // when
      const validateAvailableLottoCount = () =>
        Lotto.validateLottoPurchasedAmount(purchasedAmount);

      // then
      expect(validateAvailableLottoCount).toThrow(errorMessage);
    }
  );

  test.each([
    [
      0,
      {
        lottoNumbers: [7, 8, 19, 20, 21, 24],
        winningNumbers: [1, 2, 3, 4, 5, 6],
      },
    ],
    [
      6,
      {
        lottoNumbers: [1, 2, 3, 4, 5, 6],
        winningNumbers: [1, 2, 3, 4, 5, 6],
      },
    ],
  ])(
    "로또 번호와 당첨 번호가 일치하는 갯수는 %s개 이다.",
    (expectedResult, testSet) => {
      // given
      const lotto = new Lotto(testSet.lottoNumbers);

      // when
      const matchingCount = lotto.countMatchingLottoNumbers(
        testSet.winningNumbers
      );

      // then
      expect(matchingCount).toBe(expectedResult);
    }
  );

  test.each([
    [
      "일치하지 않으",
      false,
      {
        lottoNumbers: [1, 2, 3, 4, 5, 6],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      },
    ],
    [
      "일치하",
      true,
      {
        lottoNumbers: [7, 2, 3, 4, 5, 6],
        winningNumbers: [1, 2, 3, 4, 5, 6],
        bonusNumber: 7,
      },
    ],
  ])(
    "보너스 번호와 로또 번호가 %s면 %s 를 반환한다.",
    (_, expectedResult, testSet) => {
      // given
      const lotto = new Lotto(testSet.lottoNumbers);
      const bonusNumber = testSet.bonusNumber;

      // when
      const isBonusNumberMatching = lotto.hasLottoNumber(bonusNumber);

      // then
      expect(isBonusNumberMatching).toBe(expectedResult);
    }
  );
});
