import { LINE_PRICE } from '../constants/purchase.js';

const isValidAmountPaid = (amountPaid) => {
  if (amountPaid < LINE_PRICE) {
    throw new Error('로또는 1,000원 이상부터 구매 가능합니다.');
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
