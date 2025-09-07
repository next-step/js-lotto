export const LOTTO_PRICE_TYPE = "LOTTO_PRICE_TYPE";
export const LOTTO_WINNER_NUMBERS_TYPE = "LOTTO_WINNER_NUMBERS_TYPE";
export const LOTTO_BONUS_NUMBER_TYPE = "LOTTO_BONUS_NUMBER_TYPE";

export const LOTTO_PRICE = 1000;
export const LOTTO_COUNT = 6;
export const LOTTO_NUMBERS = Array.from({ length: 45 }, (_, i) => i + 1);
export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;

export const MATCH_THREE = 3;
export const MATCH_FOUR = 4;
export const MATCH_FIVE = 5;
export const MATCH_SIX = 6;
export const MATCH_FIVE_BONUS = "BONUS";

export const RESULTS_ORDER = [
  {
    key: MATCH_THREE,
    label: "3개 일치",
    price: 5000,
  },
  { key: MATCH_FOUR, label: "4개 일치", price: 50000 },
  { key: MATCH_FIVE, label: "5개 일치", price: 1500000 },
  {
    key: MATCH_FIVE_BONUS,
    label: "5개 일치, 보너스 볼 일치",
    price: 30000000,
  },
  { key: MATCH_SIX, label: "6개 일치", price: 2000000000 },
];
