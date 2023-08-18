import Lotto from "../../src/js/domain/Lotto";
import createMatchChecker from "../../src/js/domain/MatchChecker";
import { LottoMatchResultNotSetError } from "../../src/js/domain/Lotto/errors";

describe("로또 객체 생성 테스트", () => {
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
    });
  });

  describe("of() 테스트", () => {
    it("Lotto 인스턴스를 반환한다.", () => {
      const lotto = Lotto.of([1, 2, 3, 4, 5, 6]);
      expect(lotto).toBeInstanceOf(Lotto);
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
  const { setWinningLotto, checkMatch } = createMatchChecker();

  it("로또 매치 결과가 설정되지 않은 경우, 에러를 발생시킨다.", () => {
    expect(() => lotto.getMatchResult()).toThrow(LottoMatchResultNotSetError);
  });

  setWinningLotto([1, 2, 3, 4, 5, 6], 7);

  it("로또 매치 결과가 설정된 경우, 에러를 발생시키지 않는다.", () => {
    checkMatch(lotto);
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
        checkMatch(lotto);
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
    it.each([true, false])("isBonusMatch: %p 설정", (isBonusMatch) => {
      lotto.setIsBonusMatch(isBonusMatch);
      expect(lotto.getMatchResult().isBonusMatch).toBe(isBonusMatch);
    });
  });
});
