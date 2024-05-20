import { ErrorLottoNumber } from "../src/js/constants/error";
import LottoNumber from "../src/js/domain/LottoNumber";

describe("로또 번호 기능 테스트", () => {
  test("로또 번호는 1이상 45이하의 정수이다.", () => {
    // given
    const lottoNumber = new LottoNumber(1);

    // when
    const value = lottoNumber.value;

    // then
    expect(value).toBe(1);
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

      const generateLottoNumber = () => {
        const lottoNumber = new LottoNumber(testSet.lottoNumber);
      };

      // then
      expect(generateLottoNumber).toThrow(testSet.errorMessage);
    }
  );
});
