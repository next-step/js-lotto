import Lotto from "../src/js/Lotto";
import MatchingChecker from "../src/js/MatchingChecker";
import ResultChecker from "../src/js/ResultChecker";

const testCases = [
  {
    lotto: [1, 2, 3, 4, 5, 6],
    matchedCount: 6,
    isBonusMatched: null,
    rank: 1,
    prize: 2_000_000_000,
  },
  {
    lotto: [1, 2, 3, 4, 5, 7],
    matchedCount: 5,
    isBonusMatched: true,
    rank: 2,
    prize: 30_000_000,
  },
  {
    lotto: [1, 2, 3, 4, 5, 16],
    matchedCount: 5,
    isBonusMatched: false,
    rank: 3,
    prize: 1_500_000,
  },
  {
    lotto: [1, 2, 3, 4, 15, 16],
    matchedCount: 4,
    isBonusMatched: null,
    rank: 4,
    prize: 50_000,
  },
  {
    lotto: [1, 2, 3, 4, 15, 7],
    matchedCount: 4,
    isBonusMatched: null,
    rank: 4,
    prize: 50_000,
  },

  {
    lotto: [1, 2, 3, 14, 15, 16],
    matchedCount: 4,
    isBonusMatched: null,
    rank: 5,
    prize: 5_000,
  },
  {
    lotto: [1, 2, 3, 14, 15, 7],
    matchedCount: 4,
    isBonusMatched: null,
    rank: 5,
    prize: 5_000,
  },
  {
    lotto: [1, 2, 13, 14, 15, 16],
    matchedCount: 2,
    isBonusMatched: null,
    rank: 6,
    prize: 0,
  },
  {
    lotto: [1, 2, 13, 14, 15, 7],
    matchedCount: 2,
    isBonusMatched: null,
    rank: 6,
    prize: 0,
  },
  {
    lotto: [1, 12, 13, 14, 15, 16],
    matchedCount: 1,
    isBonusMatched: null,
    rank: 6,
    prize: 0,
  },
  {
    lotto: [1, 12, 13, 14, 15, 7],
    matchedCount: 1,
    isBonusMatched: null,
    rank: 6,
    prize: 0,
  },
  {
    lotto: [11, 12, 13, 14, 15, 16],
    matchedCount: 0,
    isBonusMatched: null,
    rank: 6,
    prize: 0,
  },
  {
    lotto: [11, 12, 13, 14, 15, 7],
    matchedCount: 0,
    isBonusMatched: null,
    rank: 6,
    prize: 0,
  },
];

describe("등수, 상금 반환 테스트", () => {
  MatchingChecker.setWinningNumbers([1, 2, 3, 4, 5, 6]);
  MatchingChecker.setBonusNumber(7);

  it("로또 당첨 번호 일치 개수 반환 메소드를 호출한다.", () => {
    const lotto = Lotto.from([1, 2, 3, 4, 5, 6]);
    MatchingChecker.setMatchInfo(lotto);
    const spyGetMatchCount = jest.spyOn(Lotto.prototype, "getMatchCount");
    ResultChecker.getResult(lotto);
    expect(spyGetMatchCount).toHaveBeenCalledTimes(1);
  });

  it("로또 보너스 번호 반환 메소드를 호출한다.", () => {
    const lotto = Lotto.from([1, 2, 3, 4, 5, 6]);
    MatchingChecker.setMatchInfo(lotto);
    const spyGetMatchBonus = jest.spyOn(Lotto.prototype, "getMatchBonus");
    ResultChecker.getResult(lotto);
    expect(spyGetMatchBonus).toHaveBeenCalledTimes(1);
  });

  it("등수와 당첨 금액을 속성으로 가진 객체를 반환한다.", () => {
    const lotto = Lotto.from([1, 2, 3, 4, 5, 6]);
    MatchingChecker.setMatchInfo(lotto);
    expect(ResultChecker.getResult(lotto)).toHaveProperty("rank");
    expect(ResultChecker.getResult(lotto)).toHaveProperty("prize");
  });

  // TODO 컨트롤러 추상화 함수로 처리
  it.each(testCases)(
    "올바른 등수와 당첨 금액을 반환한다.",
    ({ lotto: lottoNumbers, rank: expectedRank, prize: expectedPrize }) => {
      const lotto = Lotto.from(lottoNumbers);
      MatchingChecker.setMatchInfo(lotto);
      const result = ResultChecker.getResult(lotto);
      expect(result.rank).toBe(expectedRank);
      expect(result.prize).toBe(expectedPrize);
    }
  );
});
