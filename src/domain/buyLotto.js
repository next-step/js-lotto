import { createLottoNumbers } from "./createLottoNumbers.js";

export const buyLotto = (purchaseAmount) => {
  if (!isValidPurchaseAmount(purchaseAmount)) {
    throw new InvalidPurchaseAmount();
  }

  const PRICE_PER_LOTTO = 1000;
  const lottoCount = Math.trunc(purchaseAmount / PRICE_PER_LOTTO);

  return Array.from(Array(lottoCount), () => createLottoNumbers());
};

const isValidPurchaseAmount = (purchaseAmount) => {
  if (typeof purchaseAmount !== "number") return false;
  if (!Number.isInteger(purchaseAmount)) return false;
  if (purchaseAmount < 1000) return false;
  return true;
};

export class InvalidPurchaseAmount extends Error {
  constructor() {
    super("구입 금액은 1000원 이상의 정수여야 합니다.");
  }
}
