import Lotto from "../Lotto";
import { RandomIssueStrategy } from "./IssueStrategy";
import {
  PurchasingNotNumberError,
  PurchasingShouldAboveZeroError,
  PurchasingNotIntegerError,
} from "./errors";

export default createLotteryMachine = (
  issueStrategy = new RandomIssueStrategy()
) => {
  // const LOTTO_PRICE = 1_000;

  function issueLotto(purchasing) {
    validatePurchasing(purchasing);
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
