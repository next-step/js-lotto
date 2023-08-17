import Lotto from "../src/js/domain/Lotto";
import {
  NotArrayError,
  LengthNotSixError,
  ElementNotNumberError,
  ElementOutOfRangeError,
  ElementDuplicatedError,
} from "../src/js/domain/Lotto/errors";

describe("로또 객체 생성 테스트", () => {
  describe("생성자 유효성 검사 테스트", () => {
    describe("배열 형태가 아니면, 에러를 발생시킨다.", () => {
      it.each([1, "erica", true, null, undefined, function () {}, {}])(
        "%p",
        (lottoNumbers) => {
          expect(() => new Lotto(lottoNumbers)).toThrow(NotArrayError);
        }
      );
    });

    describe("배열 길이가 6이 아니라면, 에러를 발생시킨다.", () => {
      it.each([
        { lottoNumbers: [] },
        { lottoNumbers: [1, 2, 3, 4, 5] },
        { lottoNumbers: [1, 2, 3, 4, 5, 6, 7] },
      ])("$lottoNumbers", ({ lottoNumbers }) => {
        expect(() => new Lotto(lottoNumbers)).toThrow(LengthNotSixError);
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
        expect(() => new Lotto(lottoNumbers)).toThrow(ElementNotNumberError);
      });
    });

    describe("요소 중 [1, 45]를 벗어난 숫자가 있다면, 에러를 발생시킨다.", () => {
      it.each([
        { lottoNumbers: [-1, 2, 3, 4, 5, 6] },
        { lottoNumbers: [0, 2, 3, 4, 5, 6] },
        { lottoNumbers: [1, 2, 3, 4, 5, 46] },
      ])("$lottoNumbers", ({ lottoNumbers }) => {
        expect(() => new Lotto(lottoNumbers)).toThrow(ElementOutOfRangeError);
      });
    });

    describe("요소 중 중복된 숫자가 있다면, 에러를 발생시킨다.", () => {
      it.each([
        { lottoNumbers: [1, 1, 1, 1, 1, 1] },
        { lottoNumbers: [1, 2, 3, 4, 5, 5] },
        { lottoNumbers: [1, 2, 3, 4, 5, 1] },
      ])("$lottoNumbers", ({ lottoNumbers }) => {
        expect(() => new Lotto(lottoNumbers)).toThrow(ElementDuplicatedError);
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

  describe("생성자 내부 로직 테스트", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    it("유효한 입력값이면, lottoNumbers에 저장한다.", () => {
      expect(lotto.getLottoNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("matchCount와 isBonusMatched를 null로 초기화한다.", () => {
      const { matchedCount, isBonusMatched } = lotto.getMatchResult();
      expect(matchedCount).toBeNull();
      expect(isBonusMatched).toBeNull();
    });
  });

  describe("생성자 반환값 테스트", () => {
    it("Lotto 인스턴스를 반환한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      expect(lotto).toBeInstanceOf(Lotto);
    });
  });

  describe("of 메소드 테스트", () => {
    it("lotto 인스턴스를 반환한다.", () => {
      const lotto = Lotto.of([1, 2, 3, 4, 5, 6]);
      expect(lotto).toBeInstanceOf(Lotto);
    });
  });
});
