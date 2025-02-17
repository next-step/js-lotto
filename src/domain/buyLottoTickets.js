import { PRICE_PER_LOTTO } from "./constants.js";
import { createLottoNumbers } from "./createLottoNumbers.js";
import Lotto from "./Lotto.js";

export const buyLottoTickets = (purchaseAmount) => {
  if (!isValidPurchaseAmount(purchaseAmount)) {
    throw new InvalidPurchaseAmount();
  }

  const lottoCount = Math.trunc(purchaseAmount / PRICE_PER_LOTTO);

  return Array.from(Array(lottoCount), () => new Lotto(createLottoNumbers()));
};

const isValidPurchaseAmount = (purchaseAmount) => {
  if (!Number.isInteger(purchaseAmount)) return false;
  if (purchaseAmount < PRICE_PER_LOTTO) return false;
  return true;
};

export class InvalidPurchaseAmount extends Error {
  constructor() {
    super(`구입 금액은 ${PRICE_PER_LOTTO}원 이상의 정수여야 합니다.`);
  }
}
