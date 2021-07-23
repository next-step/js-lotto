import { VALUE } from './Constans.js';

export const isVaildPrice = (price) => {
  return (
    price >= VALUE.LOTTO.MIN_LOTTO_PRICE && price <= VALUE.LOTTO.MAX_LOTTO_PRICE
  );
};
