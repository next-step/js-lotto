import { MESSAGE, NUMBER } from '../../constants';

export const LottoStore = {
  validatePurchaseAmount(purchaseAmount) {
    if (purchaseAmount < NUMBER.DEFAULT_TICKET_PRICE) {
      throw new Error(MESSAGE.ERROR.INSUFFICIENT_PURCHASE_AMOUNT);
    }
  },
};
