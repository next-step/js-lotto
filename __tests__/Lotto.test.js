import Lotto from "../src/js/domain/Lotto";
import createMatchChecker from "../src/js/domain/MatchChecker/createMatchChecker";
import {
  LottoNumbersNotArrayError,
  LottoNumbersLengthNotSixError,
  LottoNumbersElementNotNumberError,
  LottoNumbersElementOutOfRangeError,
  LottoNumbersElementDuplicatedError,
  LottoMatchResultNotSetError,
} from "../src/js/domain/Lotto/errors";

describe("로또 객체 생성 테스트", () => {
  describe("생성자 유효성 검사 테스트", () => {
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
          LottoNumbersElementNotNumberError
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
          LottoNumbersElementOutOfRangeError
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
          LottoNumbersElementDuplicatedError
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

  describe("생성자 내부 로직 테스트", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    it("lottoNumbers를 저장한다.", () => {
      expect(lotto.getLottoNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe("생성자 반환값 테스트", () => {
    it("Lotto 인스턴스를 반환한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      expect(lotto).toBeInstanceOf(Lotto);
      expect(lotto.getLottoNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe("of() 테스트", () => {
    it("Lotto 인스턴스를 반환한다.", () => {
      const lotto = Lotto.of([1, 2, 3, 4, 5, 6]);
      expect(lotto).toBeInstanceOf(Lotto);
      expect(lotto.getLottoNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});

describe("getLottoNumbers() 테스트", () => {
  it("로또 번호를 반환한다.", () => {
    const lotto = Lotto.of([1, 2, 3, 4, 5, 6]);
    expect(lotto.getLottoNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe("getMatchResult() 테스트", () => {
  const lotto = Lotto.of([1, 2, 3, 4, 5, 6]);
  const { setWinningLotto, setMatchResult } = createMatchChecker();

  it("로또 매치 결과가 설정되지 않은 경우, 에러를 발생시킨다.", () => {
    expect(() => lotto.getMatchResult()).toThrow(LottoMatchResultNotSetError);
  });

  setWinningLotto([1, 2, 3, 4, 5, 6], 7);

  it("로또 매치 결과가 설정된 경우, 에러를 발생시키지 않는다.", () => {
    setMatchResult(lotto);
    expect(() => lotto.getMatchResult()).not.toThrow();
  });

  describe("로또 매치 결과를 반환한다.", () => {
    const testCases = [
      // winningLotto: [1, 2, 3, 4, 5, 6], 7
      {
        lotto: [1, 2, 3, 4, 5, 6],
        matchCount: 6,
        isBonusMatch: null,
      },
      {
        lotto: [1, 2, 3, 4, 5, 7],
        matchCount: 5,
        isBonusMatch: true,
      },
      {
        lotto: [1, 2, 3, 4, 5, 16],
        matchCount: 5,
        isBonusMatch: false,
      },
      {
        lotto: [1, 2, 3, 4, 15, 16],
        matchCount: 4,
        isBonusMatch: null,
      },
      {
        lotto: [1, 2, 3, 4, 15, 7],
        matchCount: 4,
        isBonusMatch: null,
      },

      {
        lotto: [1, 2, 3, 14, 15, 16],
        matchCount: 3,
        isBonusMatch: null,
      },
      {
        lotto: [1, 2, 3, 14, 15, 7],
        matchCount: 3,
        isBonusMatch: null,
      },
      {
        lotto: [1, 2, 13, 14, 15, 16],
        matchCount: 2,
        isBonusMatch: null,
      },
      {
        lotto: [1, 2, 13, 14, 15, 7],
        matchCount: 2,
        isBonusMatch: null,
      },
      {
        lotto: [1, 12, 13, 14, 15, 16],
        matchCount: 1,
        isBonusMatch: null,
      },
      {
        lotto: [1, 12, 13, 14, 15, 7],
        matchCount: 1,
        isBonusMatch: null,
      },
      {
        lotto: [11, 12, 13, 14, 15, 16],
        matchCount: 0,
        isBonusMatch: null,
      },
      {
        lotto: [11, 12, 13, 14, 15, 7],
        matchCount: 0,
        isBonusMatch: null,
      },
    ];

    it.each(testCases)(
      "lotto: $lotto, matchCount: $matchCount, isBonusMatch: $isBonusMatch",
      ({
        lotto: lottoNumbers,
        matchCount: expectedMatchCount,
        isBonusMatch: expectedIsBonusMatch,
      }) => {
        const lotto = Lotto.of(lottoNumbers);
        setMatchResult(lotto);
        const { matchCount, isBonusMatch } = lotto.getMatchResult();
        expect(matchCount).toBe(expectedMatchCount);
        expect(isBonusMatch).toBe(expectedIsBonusMatch);
      }
    );
  });
});

describe("로또 매치 결과 설정 테스트", () => {
  const lotto = Lotto.of([1, 2, 3, 4, 5, 6]);

  it("로또 matchCount를 설정한다.", () => {
    lotto.setMatchCount(1);
    expect(lotto.getMatchResult().matchCount).toBe(1);
  });

  describe("setIsBonusMatch() 테스트", () => {
    it.each([true, false])("isBonusMatch: %p", (isBonusMatch) => {
      lotto.setIsBonusMatch(isBonusMatch);
      expect(lotto.getMatchResult().isBonusMatch).toBe(isBonusMatch);
    });
  });
});
