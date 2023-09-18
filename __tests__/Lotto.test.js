import Lotto from "../src/js/Lotto";
import {
  LottoNumbersNotArrayError,
  LottoNumbersLengthNotSixError,
  LottoNumberNotNumberError,
  LottoNumberOutOfRangeError,
  LottoNumberDuplicatedError,
} from "../src/js/Lotto/errors";

describe("Lotto 생성자 테스트", () => {
  describe("LottoNumbers 유효성 검사 테스트", () => {
    describe("배열 형태가 아니면, 에러를 발생시킨다.", () => {
      it.each([1, "erica", true, null, undefined, function () {}, {}])(
        "%p",
        (lottoNumbers) => {
          expect(() => new Lotto(lottoNumbers)).toThrow(
            LottoNumbersNotArrayError
          );
        }
      );
    });

    describe("배열 길이가 6이 아니라면, 에러를 발생시킨다.", () => {
      it.each([
        { lottoNumbers: [] },
        { lottoNumbers: [1, 2, 3, 4, 5] },
        { lottoNumbers: [1, 2, 3, 4, 5, 6, 7] },
      ])("$lottoNumbers", ({ lottoNumbers }) => {
        expect(() => new Lotto(lottoNumbers)).toThrow(
          LottoNumbersLengthNotSixError
        );
      });
    });

    describe("요소가 숫자가 아니면 에러를 발생시킨다.", () => {
      it.each([
        { lottoNumbers: ["erica", 1, 1, 1, 1, 1] },
        { lottoNumbers: [" ", 1, 1, 1, 1, 1] },
        { lottoNumbers: ["", 1, 1, 1, 1, 1] },
        { lottoNumbers: ["1", 1, 1, 1, 1, 1] },
        { lottoNumbers: [true, 1, 1, 1, 1, 1] },
        { lottoNumbers: [null, 1, 1, 1, 1, 1] },
        { lottoNumbers: [undefined, 1, 1, 1, 1, 1] },
        { lottoNumbers: [function () {}, 1, 1, 1, 1, 1] },
        { lottoNumbers: [{}, 1, 1, 1, 1, 1] },
      ])("$lottoNumbers", ({ lottoNumbers }) => {
        expect(() => new Lotto(lottoNumbers)).toThrow(
          LottoNumberNotNumberError
        );
      });
    });

    describe("요소 중 [1, 45]를 벗어난 숫자가 있다면, 에러를 발생시킨다.", () => {
      it.each([
        { lottoNumbers: [-1, 2, 3, 4, 5, 6] },
        { lottoNumbers: [0, 2, 3, 4, 5, 6] },
        { lottoNumbers: [1, 2, 3, 4, 5, 46] },
      ])("$lottoNumbers", ({ lottoNumbers }) => {
        expect(() => new Lotto(lottoNumbers)).toThrow(
          LottoNumberOutOfRangeError
        );
      });
    });

    describe("요소 중 중복된 숫자가 있다면, 에러를 발생시킨다.", () => {
      it.each([
        { lottoNumbers: [1, 1, 1, 1, 1, 1] },
        { lottoNumbers: [1, 2, 3, 4, 5, 5] },
        { lottoNumbers: [1, 2, 3, 4, 5, 1] },
      ])("$lottoNumbers", ({ lottoNumbers }) => {
        expect(() => new Lotto(lottoNumbers)).toThrow(
          LottoNumberDuplicatedError
        );
      });
    });

    describe("유효하면, 에러를 발생시키지 않는다.", () => {
      it.each([
        { lottoNumbers: [1, 2, 3, 4, 5, 6] },
        { lottoNumbers: [1, 2, 3, 4, 5, 45] },
      ])("$lottoNumbers", ({ lottoNumbers }) => {
        expect(() => new Lotto(lottoNumbers)).not.toThrow();
      });
    });
  });
});
