const LOTTO_RULES = Object.freeze({
  LOTTO_BALLS: 6,
  LOTTO_MIN_NUMBER: 1,
  LOTTO_MAX_NUMBER: 45,
  LOTTO_MIN_NUMBER_ALLOWED: 1,
  LOTTO_MIN_LENGTH: 6,
});

const LOTTO_PRICE = Object.freeze({
  PRICE: 1_000,
  FIRST_WINNER: 2_000_000_000,
  SECOND_WINNER: 30_000_000,
  THIRD_WINNER: 1_500_000,
  FOURTH_WINNER: 50_000,
  FIFTH_WINNER: 5_000,
});

const INFO_MESSAGE = Object.freeze({
  REQUEST_PAYMENT: "구입금액을 입력해 주세요.\n",
  REQUEST_WIN_NUMBER: "\n당첨 번호를 입력해 주세요.\n",
  REQUEST_BONUS_NUMBER: "보너스 번호를 입력해 주세요.\n",
  REQUEST_RESTART: "다시 시작하시겠습니까? (Y / random key) + Enter",
});

export { LOTTO_RULES, LOTTO_PRICE, INFO_MESSAGE };
