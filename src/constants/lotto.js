export const LOTTO_PRICE_TYPE = "LOTTO_PRICE_TYPE";
export const LOTTO_WINNER_NUMBERS_TYPE = "LOTTO_WINNER_NUMBERS_TYPE";
export const LOTTO_BONUS_NUMBER_TYPE = "LOTTO_BONUS_NUMBER_TYPE";

export const LOTTO_PRICE = 1000;
export const LOTTO_COUNT = 6;
export const LOTTO_NUMBERS = Array.from({ length: 45 }, (_, i) => i + 1);
export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;

export const MATCHED_PRICE = {
  3: { price: 5000 },
  4: { price: 50000 },
  5: { price: 1500000, bonusPrice: 30000000 },
  6: { price: 2000000000 },
};
