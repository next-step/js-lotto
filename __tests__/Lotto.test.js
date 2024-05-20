import { ErrorLottoNumbers } from "../src/js/constants/error";
import Lotto from "../src/js/domain/Lotto";
import LottoNumber from "../src/js/domain/LottoNumber";

describe("로또 기능 테스트", () => {
  test.each(["1,2,3,4,5,6", [1, 2, 3, 4, 5, 6]])(
    "로또 번호가 서로 다른 1이상 45이하의 정수 6개가 문자열 또는 배열 형태로 주어지면 로또가 정상적으로 생성된다.",
    (testSet) => {
      // given
      const lotto = new Lotto(testSet);

      // when
      const lottoNumbers = lotto.numbers;

      // then
      expect(lottoNumbers).toEqual([1, 2, 3, 4, 5, 6]);
    }
  );

  test("로또 번호 중 중복되는 수가 있다면 에러가 발생한다", () => {
    // given
    const lottoNumbers =
      Lotto.convertLottoNumbersToLottoNumberArray("1,1,2,3,4,5");

    // when
    const validateLottoNumbers = () => Lotto.validateLottoNumbers(lottoNumbers);

    // then
    expect(validateLottoNumbers).toThrow(
      ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_DUPLICATED
    );
  });

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
      const winningLotto = new Lotto(testSet.winningNumbers);

      // when
      const matchingCount = lotto.countMatchingLottoNumbers(winningLotto);

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
      const bonusNumber = new LottoNumber(testSet.bonusNumber);

      // when
      const isBonusNumberMatching = lotto.hasLottoNumber(bonusNumber);

      // then
      expect(isBonusNumberMatching).toBe(expectedResult);
    }
  );

  test("로또 번호는 정렬하여 저장한다", () => {
    // given // when
    const unsortedLotto = new Lotto([6, 5, 4, 3, 2, 1]);

    // then
    expect(unsortedLotto.numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
