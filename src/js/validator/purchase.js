import ERROR from '../constants/error.js';
import { LOTTO_PRICE } from '../constants/lotto-config.js';

const isUnmatchedPricePerSheet = (value) => value % LOTTO_PRICE !== 0 || value <= 0;

const checkValidPurchase = (money) => {
  if (isUnmatchedPricePerSheet(money)) throw new Error(ERROR.PURCHASE.UNMATCHED_PRICE_PER_SHEET);
};

export default checkValidPurchase;
