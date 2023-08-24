import Lotto from "../Lotto/index.js";
import RandomIssueStrategy from "./RandomIssueStrategy.js";
import {
  PurchasingPriceNotNumberError,
  PurchasingPriceShouldAboveZeroError,
  PurchasingPriceNotIntegerError,
  PurchasingPriceUpperLimitError,
} from "./errors.js";

const createLotteryMachine = (issueStrategy = new RandomIssueStrategy()) => {
  const LOTTO_PRICE = 1_000;
  const PURCHASING_UPPER_LIMIT = 100_000;

  function issueLottosWith(purchasingPrice) {
    validateInput(purchasingPrice);

    const lottos = [];
    let maximumPurchaseCount = Math.floor(purchasingPrice / LOTTO_PRICE);
    while (maximumPurchaseCount--) {
      lottos.push(issueLotto());
    }

    return lottos;
  }

  function validateInput(purchasingPrice) {
    if (typeof purchasingPrice !== "number")
      throw new PurchasingPriceNotNumberError();
    if (purchasingPrice <= 0) throw new PurchasingPriceShouldAboveZeroError();
    if (!Number.isInteger(purchasingPrice))
      throw new PurchasingPriceNotIntegerError();
    if (purchasingPrice > PURCHASING_UPPER_LIMIT)
      throw new PurchasingPriceUpperLimitError();
  }

  function issueLotto() {
    const lottoNumbers = issueStrategy.getLottoNumbers();
    return Lotto.of(lottoNumbers);
  }

  return {
    issueLottosWith,
  };
};

export default createLotteryMachine;
