import LotteryMachine from "./LotteryMachine";
import MatchingChecker from "./MatchingChecker";

const LotteryPlatform = (function () {
  let lotto = null;
  // const UPPER_LIMIT = 10;
  const ERROR_MESSAGE = Object.freeze({
    NOT_NUMBER: "발행 개수는 숫자 형태여야합니다.",
    NOT_POSITIVE: "발행 개수는 양수여야합니다.",
    NOT_INTEGER: "발행 개수는 정수 형태여야합니다.",
    // TOO_MANY: "사용자는 10개 초과 로또를 구매할 수 없습니다.",
  });

  function validateLotteryIssueCount(issueCount) {
    if (typeof issueCount !== "number")
      throw new Error(ERROR_MESSAGE.NOT_NUMBER);
    if (issueCount <= 0) throw new Error(ERROR_MESSAGE.NOT_POSITIVE);
    if (!Number.isInteger(issueCount))
      throw new Error(ERROR_MESSAGE.NOT_INTEGER);
    // if (issueCount > UPPER_LIMIT) throw new Error(ERROR_MESSAGE.TOO_MANY);
  }

  // TODO 우선 한 개만 발행. [phase2] issueCount개 발행으로 확장.
  function issueLottoOf(issueCount) {
    validateLotteryIssueCount(issueCount);
    lotto = LotteryMachine.issueLotto(1);
  }

  function getLotto() {
    return lotto;
  }

  function clearLotto() {
    lotto = null;
  }

  function getLottoNumbers() {
    return lotto.getLottoNumbers();
  }

  function setUpMatchingChecker(winningNumbers, bonusNumber) {
    MatchingChecker.setWinningNumbers(winningNumbers);
    MatchingChecker.setBonusNumber(bonusNumber);
  }

  function requestMatchCheck() {
    return MatchingChecker.setMatchInfo(lotto);
  }

  function getMatchResult() {
    const matchCount = lotto.getMatchCount();
    const isBonusMatched = lotto.getMatchBonus();

    const rank = getRank(matchCount, isBonusMatched);
    const prize = PRIZE[rank];

    return {
      rank,
      prize,
    };
  }

  function getRank(matchCount, isBonusMatched) {
    switch (matchCount) {
      case 6:
        return 1;
      case 5:
        if (isBonusMatched) return 2;
        return 3;
      case 4:
        return 4;
      case 3:
        return 5;
      default:
        return 6;
    }
  }

  const PRIZE = Object.freeze({
    1: 2_000_000_000,
    2: 30_000_000,
    3: 1_500_000,
    4: 50_000,
    5: 5_000,
    6: 0,
  });

  return {
    ERROR_MESSAGE,
    issueLottoOf,
    getLotto,
    clearLotto,
    getLottoNumbers,
    setUpMatchingChecker,
    requestMatchCheck,
    getMatchResult,
  };
})();

export default LotteryPlatform;
