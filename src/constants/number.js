const LOTTO_TICKET = Object.freeze({
  MIN_RANGE: 1,
  MAX_RANGE: 43,
  NUMBERS_LENGTH: 6,
});

const LOTTO_PRIZE = Object.freeze({
  DEFAULT: 0,
  BONUS_MATCH_THRESHOLD: 5,
});

export const NUMBER = Object.freeze({ LOTTO_TICKET, LOTTO_PRIZE });
