export const LOTTO_NUMBER_LENGTH = 6;
export const LOTTO_UNIT_PRICE = 1000;
export const MAX_LOTTO_NUMBER = 45;
export const MIN_LOTTO_NUMBER = 1;

export const errorMessages = {
  LOTTO_UNIT_PRICE_ERROR: `로또 구입 금액을 ${LOTTO_UNIT_PRICE.toLocaleString()}원 단위로 입력해 주세요.`,
  DUPLICATE_NUMBERS_ERROR: '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
};

export const LOTTO_WINNING_NUMBER_SCORE = 2;
export const LOTTO_BONUS_NUMBER_SCORE = 1;
export const LOTTO_RANKS = {
  [LOTTO_WINNING_NUMBER_SCORE * 6]: {
    rank: 1,
    won: 2_000_000_000,
  },
  [LOTTO_WINNING_NUMBER_SCORE * 5 + LOTTO_BONUS_NUMBER_SCORE]: {
    rank: 2,
    won: 30_000_000,
  },
  [LOTTO_WINNING_NUMBER_SCORE * 5]: {
    rank: 3,
    won: 1_5000_000,
  },
  [LOTTO_WINNING_NUMBER_SCORE * 4 + LOTTO_BONUS_NUMBER_SCORE]: {
    rank: 4,
    won: 50_000,
  },
  [LOTTO_WINNING_NUMBER_SCORE * 4]: {
    rank: 4,
    won: 50_000,
  },
  [LOTTO_WINNING_NUMBER_SCORE * 3 + LOTTO_BONUS_NUMBER_SCORE]: {
    rank: 5,
    won: 5000,
  },
  [LOTTO_WINNING_NUMBER_SCORE * 3]: {
    rank: 5,
    won: 5000,
  },
};
