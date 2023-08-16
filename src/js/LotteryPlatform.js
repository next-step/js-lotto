import LotteryMachine from "./LotteryMachine";

const LotteryPlatform = (function () {
  let lottos = [];
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
    lottos.push(LotteryMachine.issueLotto(issueCount));
  }

  function getLottos() {
    return lottos;
  }

  function clearLottos() {
    lottos = [];
  }

  return {
    ERROR_MESSAGE,
    issueLottoOf,
    getLottos,
    clearLottos,
  };
})();

export default LotteryPlatform;
