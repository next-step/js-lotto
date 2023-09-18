import {
  PurchasingPriceNotNumberError,
  PurchasingPriceIsNegativeError,
  PurchasingPriceLessLowerBoundError,
  PurchasingPriceAboveUpperBoundError,
} from "./errors.js";
import {
  LOTTO_UNIT_PRICE,
  LOTTO_DIGITS,
  LOTTO_LOWER_BOUND,
  LOTTO_UPPER_BOUND,
} from "../../constants.js";
import Lotto from "../Lotto/index.js";

export default class LottoMachine {
  ZERO = 0;
  MIN_ISSUE_AMOUNT = 1;
  MAX_ISSUE_AMOUNT = 100;

  issueLottoOf(purchasingPrice) {
    this.#validatePurchasingPrice(purchasingPrice);
    const issueAmount = Math.floor(purchasingPrice / LOTTO_UNIT_PRICE);
    const lottos = [];
    for (let i = 0; i < issueAmount; i++) {
      lottos.push(this.#issueLotto());
    }
    return lottos;
  }

  #validatePurchasingPrice(purchasingPrice) {
    if (typeof purchasingPrice !== "number")
      throw new PurchasingPriceNotNumberError();
    if (purchasingPrice < this.ZERO) throw new PurchasingPriceIsNegativeError();
    if (purchasingPrice < LOTTO_UNIT_PRICE * this.MIN_ISSUE_AMOUNT)
      throw new PurchasingPriceLessLowerBoundError();
    if (purchasingPrice > LOTTO_UNIT_PRICE * this.MAX_ISSUE_AMOUNT)
      throw new PurchasingPriceAboveUpperBoundError();
  }

  #generateLottoNumbers() {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < LOTTO_DIGITS) {
      const randomNumber =
        Math.floor(Math.random() * LOTTO_UPPER_BOUND) + LOTTO_LOWER_BOUND;
      lottoNumbers.add(randomNumber);
    }
    return Array.from(lottoNumbers);
  }

  #issueLotto() {
    const lottoNumbers = this.#generateLottoNumbers();
    return Lotto.of(lottoNumbers);
  }
}
