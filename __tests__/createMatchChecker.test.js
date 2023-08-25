import createMatchChecker from "../src/js/domain/MatchChecker/createMatchChecker";
import WinningLotto from "../src/js/domain/MatchChecker/WinningLotto";
import Lotto from "../src/js/domain/Lotto";
import { WinningLottoNotSetError } from "../src/js/domain/MatchChecker/errors";

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

describe("당첨 로또 설정 테스트", () => {
  const { setWinningLotto } = createMatchChecker();
  it("당첨 로또 생성 함수를 1번 호출한다.", () => {
    const spyWinningLottoFrom = jest.spyOn(WinningLotto, "from");
    setWinningLotto([1, 2, 3, 4, 5, 6], 7);
    expect(spyWinningLottoFrom).toBeCalledTimes(1);
    // jest.clearAllMocks();
  });

  it("당첨 번호와 보너스 번호를 인자로 전달한다.", () => {
    const spyWinningLottoFrom = jest.spyOn(WinningLotto, "from");
    setWinningLotto([1, 2, 3, 4, 5, 6], 7);
    expect(spyWinningLottoFrom).toBeCalledWith([1, 2, 3, 4, 5, 6], 7);
  });
});

describe("로또 당첨 여부 확인 테스트", () => {
  describe("당첨 로또 존재 확인 테스트", () => {
    const { setWinningLotto, setMatchResult } = createMatchChecker();
    const lotto = Lotto.of([1, 2, 3, 4, 5, 6]);

    it("당첨 로또 설정되어 있지 않으면, 에러를 발생시킨다.", () => {
      expect(() => setMatchResult(lotto)).toThrow(WinningLottoNotSetError);
    });

    it("당첨 로또가 설정되어 있으면 에러를 발생시키지 않는다.", () => {
      setWinningLotto([1, 2, 3, 4, 5, 6], 7);
      expect(() => setMatchResult(lotto)).not.toThrow(WinningLottoNotSetError);
    });
  });

  describe("로또 당첨 번호 일치 개수 확인 테스트", () => {
    const { setWinningLotto, setMatchResult } = createMatchChecker();
    setWinningLotto([1, 2, 3, 4, 5, 6], 7);

    describe("당첨 로또: [1, 2, 3, 4, 5, 6]와 일치 개수를 구해 Lotto 인스턴스에 저장한다.", () => {
      it.each(testCases)(
        "로또 번호: $lotto, 일치 개수: $matchCount",
        ({ lotto: lottoNumbers, matchCount: expectedmatchCount }) => {
          const lotto = Lotto.of(lottoNumbers);
          setMatchResult(lotto);
          const { matchCount } = lotto.getMatchResult();
          expect(matchCount).toBe(expectedmatchCount);
        }
      );
    });
  });

  describe("로또 보너스 번호 일치 여부 확인 테스트", () => {
    const notFiveMatchedTestCases = testCases.filter(
      (testCase) => testCase.matchCount !== 5
    );
    const fiveMatchedTestCases = testCases.filter(
      (testCase) => testCase.matchCount === 5
    );

    const { setWinningLotto, setMatchResult } = createMatchChecker();
    setWinningLotto([1, 2, 3, 4, 5, 6], 7);

    describe("일치 개수가 5개가 아닌 경우, 보너스 번호 일치 여부를 확인하지 않는다.", () => {
      it.each(notFiveMatchedTestCases)(
        "일치 개수: $matchCount",
        ({ lotto: lottoNumbers }) => {
          const lotto = Lotto.of(lottoNumbers);
          setMatchResult(lotto);
          const { isBonusMatch } = lotto.getMatchResult();
          expect(isBonusMatch).toBeNull();
        }
      );
    });

    describe("일치 개수가 5개인 경우, 보너스 번호 일치 여부를 확인한다.", () => {
      it.each(fiveMatchedTestCases)(
        "일치 개수: $matchCount",
        ({ lotto: lottoNumbers }) => {
          const lotto = Lotto.of(lottoNumbers);
          setMatchResult(lotto);
          const { isBonusMatch } = lotto.getMatchResult();
          expect(typeof isBonusMatch === "boolean").toBe(true);
        }
      );
    });

    describe("보너스 번호: 7 일치 여부를 Lotto 인스턴스에 저장한다.", () => {
      const fiveMatchedTestCases = testCases.filter(
        (testCase) => testCase.matchCount === 5
      );
      it.each(fiveMatchedTestCases)(
        "로또 번호: $lotto, 보너스 번호 일치 여부: $isBonusMatch",
        ({ lotto: lottoNumbers, isBonusMatch: expectedisBonusMatch }) => {
          const lotto = Lotto.of(lottoNumbers);
          setMatchResult(lotto);
          const { isBonusMatch } = lotto.getMatchResult();
          expect(isBonusMatch).toBe(expectedisBonusMatch);
        }
      );
    });
  });
});
