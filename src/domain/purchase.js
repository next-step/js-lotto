import {
  LINE_MINIMUM_NUMBER,
  LINE_MAXIMUM_NUMBER,
  LINE_SIZE,
  LINE_PRICE,
} from '../constants/purchase.js';

export const isValidAmountPaid = (amountPaid) => {
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

export const generateLottoLine = () => {
  const lottoLine = [];

  const numberRange = Array.from(
    { length: LINE_MAXIMUM_NUMBER },
    (v, i) => i + 1,
  );

  for (let i = 0; i < LINE_SIZE; i++) {
    const randomIndex = Math.floor(Math.random() * numberRange.length);

    lottoLine.push(...numberRange.splice(randomIndex, 1));
  }

  lottoLine.sort((a, b) => a - b);
  return lottoLine;
};
