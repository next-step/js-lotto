import { LINE_PRICE, PURCHASE_ERROR_MESSAGE } from '../constants/purchase.js';

const isValidAmountPaid = (amountPaid) => {
  if (amountPaid < LINE_PRICE) {
    throw new Error(PURCHASE_ERROR_MESSAGE.MINIMUM_AMOUNT_PAID);
  }

  return !!amountPaid;
};

const countLine = (amountPaid) => {
  return Math.floor(amountPaid / LINE_PRICE);
};

export const buyNumbers = (amountPaid) => {
  if (!isValidAmountPaid(amountPaid)) {
    return;
  }

  const purchasedLottoCount = countLine(amountPaid);

  return purchasedLottoCount;
};
