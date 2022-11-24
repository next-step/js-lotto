import { LOTTO_CONSTRAINT } from './constants/index.js';

const generateRandomNumber = () => {
  return (
    Math.floor(
      Math.random() *
        (LOTTO_CONSTRAINT.MAX_IN_LOTTO_NUMBER - LOTTO_CONSTRAINT.MIN_IN_LOTTO_NUMBER + 1),
    ) + LOTTO_CONSTRAINT.MIN_IN_LOTTO_NUMBER
  );
};

const generatePurchasedLottoToArray = () => {
  const purchasedLottoToSet = new Set();
  while (purchasedLottoToSet.size < LOTTO_CONSTRAINT.LOTTO_NUMBERS_COUNT) {
    purchasedLottoToSet.add(generateRandomNumber());
  }
  return [...purchasedLottoToSet];
};

export const getLottoNumbers = (priceInput) => {
  const purchasedLottoCount = priceInput / LOTTO_CONSTRAINT.PRICE_UNIT;
  return Array(purchasedLottoCount)
    .fill()
    .map(() => generatePurchasedLottoToArray());
};
