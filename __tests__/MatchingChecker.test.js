import Lotto from "../src/js/Lotto";
import MatchingChecker from "../src/js/MacthingChecker";

const testCases = [
  {
    lotto: [1, 2, 3, 4, 5, 6],
    matchedCount: 6,
    isBonusMatched: true,
  },
  {
    lotto: [1, 2, 3, 4, 5, 6],
    matchedCount: 6,
    isBonusMatched: false,
  },
  {
    lotto: [1, 2, 3, 4, 5, 7],
    matchedCount: 5,
    isBonusMatched: true,
  },
  {
    lotto: [1, 2, 3, 4, 5, 16],
    matchedCount: 5,
    isBonusMatched: false,
  },
  {
    lotto: [1, 2, 3, 4, 15, 7],
    matchedCount: 4,
    isBonusMatched: true,
  },
  {
    lotto: [1, 2, 3, 4, 15, 16],
    matchedCount: 4,
    isBonusMatched: false,
  },
  {
    lotto: [1, 2, 3, 14, 15, 7],
    matchedCount: 3,
    isBonusMatched: true,
  },
  {
    lotto: [1, 2, 3, 14, 15, 16],
    matchedCount: 3,
    isBonusMatched: false,
  },
];
const ERROR_MESSAGE = MatchingChecker.ERROR_MESSAGE;

describe("로또 당첨 번호 설정 유효성 검사 테스트", () => {
  it.each([1, "erica", true, null, undefined, function () {}, {}])(
    "배열 형태가 아니면, 에러를 발생시킨다.",
    (input) => {
      expect(() => MatchingChecker.setWinningNumbers(input)).toThrow(
        ERROR_MESSAGE.NOT_ARRAY
      );
    }
  );

  it.each([
    ["erica", 1, 1, 1, 1, 1],
    [" ", 1, 1, 1, 1, 1],
    ["", 1, 1, 1, 1, 1],
    ["1", 1, 1, 1, 1, 1],
    [true, 1, 1, 1, 1, 1],
    [null, 1, 1, 1, 1, 1],
    [undefined, 1, 1, 1, 1, 1],
    [function () {}, 1, 1, 1, 1, 1],
    [{}, 1, 1, 1, 1, 1],
  ])("배열 요소가 숫자가 아니면 에러를 발생시킨다.", (...input) => {
    expect(() => MatchingChecker.setWinningNumbers(input)).toThrow(
      ERROR_MESSAGE.ELEMENT_NOT_NUMBER
    );
  });

  it.each([[], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6, 7]])(
    "배열 길이가 6이 아니라면, 에러를 발생시킨다.",
    (...input) => {
      expect(() => MatchingChecker.setWinningNumbers(input)).toThrow(
        ERROR_MESSAGE.NOT_LENGTH_SIX
      );
    }
  );

  it.each([
    [-1, 2, 3, 4, 5, 6],
    [0, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 46],
  ])(
    "배열 요소 중 [1, 45]를 벗어난 숫자가 있다면, 에러를 발생시킨다.",
    (...input) => {
      expect(() => MatchingChecker.setWinningNumbers(input)).toThrow(
        ERROR_MESSAGE.ELEMENT_OUT_OF_RANGE
      );
    }
  );

  it.each([
    [1, 1, 1, 1, 1, 1],
    [1, 2, 3, 4, 5, 5],
    [1, 2, 3, 4, 5, 1],
  ])("배열 요소 중 중복된 숫자가 있다면, 에러를 발생시킨다.", (...input) => {
    expect(() => MatchingChecker.setWinningNumbers(input)).toThrow(
      ERROR_MESSAGE.ELEMENT_DUPLICATED
    );
  });

  it.each([
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 45],
  ])("유효한 입력값이면, 에러를 발생시키지 않는다.", (...input) => {
    expect(() => MatchingChecker.setWinningNumbers(input)).not.toThrow();
  });
});

describe("로또 보너스 번호 설정 유효성 검사 테스트", () => {
  it.each(["1", "erica", true, null, undefined, function () {}, {}])(
    "숫자 형태가 아니면, 에러를 발생시킨다.",
    (input) => {
      expect(() => MatchingChecker.setBonusNumber(input)).toThrow(
        ERROR_MESSAGE.BONUS_NUMBER_NOT_NUMBER
      );
    }
  );

  it.each([-1, 0, 46])(
    "[1, 45] 범위를 벗어난 숫자면, 에러를 발생시킨다.",
    (input) => {
      expect(() => MatchingChecker.setBonusNumber(input)).toThrow(
        ERROR_MESSAGE.BONUS_NUMBER_OUT_OF_RANGE
      );
    }
  );

  it("당첨 번호와 보너스 번호가 중복되면, 에러를 발생시킨다.", () => {
    MatchingChecker.setWinningNumbers([1, 2, 3, 4, 5, 6]);
    expect(() => MatchingChecker.setBonusNumber(1)).toThrow(
      ERROR_MESSAGE.BONUS_NUMBER_DUPLICATED
    );
  });
});

describe("로또 당첨 여부 확인 테스트", () => {
  beforeAll(() => {
    MatchingChecker.setWinningNumbers([1, 2, 3, 4, 5, 6]);
    MatchingChecker.setBonusNumber(7);
  });

  describe("로또 당첨 번호 일치 개수 확인 테스트", () => {
    it.each(testCases)(
      "당첨 번호와 일치하는 로또 번호 개수를 구해 Lotto 객체에 저장한다.",
      ({ lotto: lottoNumbers, matchedCount: expectedMatchedCount }) => {
        const lotto = Lotto.from(lottoNumbers);
        MatchingChecker.setMatchInfo(lotto);
        expect(lotto.getMatchCount()).toBe(expectedMatchedCount);
      }
    );

    const nonFiveMatchedTestCases = testCases.filter(
      (testCase) => testCase.matchedCount !== 5
    );
    const fiveMatchedTestCases = testCases.filter(
      (testCase) => testCase.matchedCount === 5
    );

    it.each(nonFiveMatchedTestCases)(
      "당첨 번호 일치 개수가 5개가 아닌 경우, 보너스 번호 일치 여부를 확인하지 않는다.",
      ({ lotto: lottoNumbers }) => {
        const lotto = Lotto.from(lottoNumbers);
        MatchingChecker.setMatchInfo(lotto);
        expect(lotto.getMatchBonus()).toBeNull();
      }
    );

    it.each(fiveMatchedTestCases)(
      "당첨 번호 일치 개수가 5개인 경우만, 보너스 번호 일치 여부를 확인한다.",
      ({ lotto: lottoNumbers }) => {
        const lotto = Lotto.from(lottoNumbers);
        MatchingChecker.setMatchInfo(lotto);
        expect(typeof lotto.getMatchBonus() === "boolean").toBe(true);
      }
    );

    it.each(fiveMatchedTestCases)(
      "당첨 번호 일치 개수가 5개인 경우, 보너스 번호 일치 여부를 확인한다.",
      ({ lotto: lottoNumbers }) => {
        const lotto = Lotto.from(lottoNumbers);
        MatchingChecker.setMatchInfo(lotto);
        expect(typeof lotto.getMatchBonus() === "boolean").toBe(true);
      }
    );
  });

  describe("로또 보너스 일치 여부 확인 테스트", () => {
    const fiveMatchedTestCases = testCases.filter(
      (testCase) => testCase.matchedCount === 5
    );

    it.each(fiveMatchedTestCases)(
      "보너스 번호 일치 여부를 확인하여 Lotto 객체에 저장한다.",
      ({ lotto: lottoNumbers, isBonusMatched }) => {
        const lotto = Lotto.from(lottoNumbers);
        MatchingChecker.setMatchInfo(lotto);
        expect(lotto.getMatchBonus()).toBe(isBonusMatched);
      }
    );
  });
});
