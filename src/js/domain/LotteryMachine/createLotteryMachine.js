import Lotto from "../Lotto/index.js";
import { RandomIssueStrategy } from "./IssueStrategy.js";
import {
  PurchasingNotNumberError,
  PurchasingShouldAboveZeroError,
  PurchasingNotIntegerError,
} from "./errors.js";

const createLotteryMachine = (issueStrategy = new RandomIssueStrategy()) => {
  // const LOTTO_PRICE = 1_000;

  function issueLotto(purchasing) {
    validatePurchasing(purchasing);
    // [phase1] 우선 한 장 만 구매
    const lottoNumbers = issueStrategy.getLottoNumbers();
    return Lotto.of(lottoNumbers);
  }

  function validatePurchasing(purchasing) {
    // const PURCHASING_UPPER_LIMIT = 100_000;
    if (typeof purchasing !== "number") throw new PurchasingNotNumberError();
    if (purchasing <= 0) throw new PurchasingShouldAboveZeroError();
    if (!Number.isInteger(purchasing)) throw new PurchasingNotIntegerError();
    // if (purchasing > PURCHASING_UPPER_LIMIT) throw new Error();
  }

  return {
    issueLotto,
  };
};

export default createLotteryMachine;
