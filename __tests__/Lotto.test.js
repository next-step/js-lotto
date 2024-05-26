import { ErrorLottoNumbers } from "../src/js/constants/error";
import Lotto from "../src/js/domain/Lotto";

describe("로또 기능 테스트", () => {
  test.each(["1,2,3,4,5,6", [1, 2, 3, 4, 5, 6]])(
    "로또 번호가 서로 다른 1이상 45이하의 정수 6개가 문자열 또는 배열 형태로 주어지면 로또가 정상적으로 생성된다.",
    (testSet) => {
      // given
      const lotto = new Lotto(testSet);

      // when
      const lottoNumbers = lotto.lottoNumbers;

      // then
      expect(lottoNumbers).toEqual([1, 2, 3, 4, 5, 6]);
    }
  );

  test("로또 번호 중 중복되는 수가 있다면 에러가 발생한다", () => {
    // given
    const lottoNumberInstances =
      Lotto.createLottoNumberInstances("1,1,2,3,4,5");

    // when
    const validateLotto = () => Lotto.validateLotto(lottoNumberInstances);

    // then
    expect(validateLotto).toThrow(
      ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_DUPLICATED
    );
  });

  test.each([
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6, 7],
  ])("로또 번호가 6개가 아니라면 에러가 발생한다.", (testSet) => {
    // given
    const lottoNumberInstances = Lotto.createLottoNumberInstances(testSet);

    // when
    const validateLotto = () => Lotto.validateLotto(lottoNumberInstances);

    // then
    expect(validateLotto).toThrow(
      ErrorLottoNumbers.ERROR_LOTTO_NUMBERS_NOT_VALID_LENGTH
    );
  });

  test("로또 번호는 정렬하여 저장한다", () => {
    // given // when
    const unsortedLotto = new Lotto([6, 5, 4, 3, 2, 1]);

    // then
    expect(unsortedLotto.lottoNumbers).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
