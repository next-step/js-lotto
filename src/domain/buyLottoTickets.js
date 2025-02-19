import { PRICE_PER_LOTTO } from "./constants.js";
import LottoTicket from "./LottoTicket.js";
import { validatePurchaseAmount } from "./validators/purchaseValidator.js";

export const buyLottoTickets = (purchaseAmount) => {
  validatePurchaseAmount(purchaseAmount);

  const lottoCount = Math.trunc(purchaseAmount / PRICE_PER_LOTTO);

  return Array.from(Array(lottoCount), () => new LottoTicket());
};
