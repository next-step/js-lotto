export const LOTTO_BALLS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
  33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45
];

export const LOTTO_PRICE = 1000;
export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;
export const LOTTO_NUMBER_SEPARATOR = ',';

export const LOTTO_MODE = Object.freeze({
  AUTO: 'auto',
  MANUAL: 'manual'
});

export const LOTTO_PRIZE = Object.freeze({
  FIRST: 2000000000,
  SECOND: 30000000,
  THIRD: 1500000,
  FOURTH: 50000,
  FIFTH: 5000
});

export const LOTTO_MATCH_COUNT = Object.freeze({
  FIRST: { BASE_NUMBER: 6, BONUS_NUMBER: 0 },
  SECOND: { BASE_NUMBER: 5, BONUS_NUMBER: 1 },
  THIRD: { BASE_NUMBER: 5, BONUS_NUMBER: 0 },
  FOURTH: { BASE_NUMBER: 4, BONUS_NUMBER: 0 },
  FIFTH: { BASE_NUMBER: 3, BONUS_NUMBER: 0 }
});
