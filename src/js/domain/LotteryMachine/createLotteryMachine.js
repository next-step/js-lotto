import Lotto from "../Lotto/index.js";
import { RandomIssueStrategy } from "./IssueStrategy.js";
import {
  PurchasingNotNumberError,
  PurchasingShouldAboveZeroError,
  PurchasingNotIntegerError,
} from "./errors.js";

const createLotteryMachine = (issueStrategy = new RandomIssueStrategy()) => {
  // const LOTTO_PRICE = 1_000;

  function issueLotto(money) {
    validateInput(money);
    // [phase1] 우선 한 장 만 구매
    const lottoNumbers = issueStrategy.getLottoNumbers();
    return Lotto.of(lottoNumbers);
  }

  function validateInput(money) {
    // const PURCHASING_UPPER_LIMIT = 100_000;

    if (typeof money !== "number") throw new PurchasingNotNumberError();
    if (money <= 0) throw new PurchasingShouldAboveZeroError();
    if (!Number.isInteger(money)) throw new PurchasingNotIntegerError();
    // if (money > PURCHASING_UPPER_LIMIT) throw new Error();
  }

  return {
    issueLotto,
  };
};

export default createLotteryMachine;
