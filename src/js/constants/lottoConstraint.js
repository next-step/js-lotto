export const PERCENTAGE_UNIT = 100;

export const LOTTO_CONSTRAINT = {
  PRICE_UNIT: 1000,
  MAX_IN_LOTTO_NUMBER: 45,
  MIN_IN_LOTTO_NUMBER: 1,
  LOTTO_NUMBERS_COUNT: 6,
};

export const PRIZE_TYPES = {
  THREE: { matchingCount: '3개', money: 5_000 },
  FOUR: { matchingCount: '4개', money: 50_000 },
  FIVE: { matchingCount: '5개', money: 1_500_000 },
  FIVE_BONUS: { matchingCount: '5개 + 보너스볼', money: 30_000_000 },
  SIX: { matchingCount: '6개', money: 2_000_000_000 },
};
