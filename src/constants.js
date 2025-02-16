export const LOTTO_PRICE = 1000;
export const LOTTO_NUMBERS_COUNT = 6;
export const LOTTO_MAX_NUMBER = 45;

export const ERROR_MESSAGES = {
  PURCHASE_INVALID_AMOUNT: "Amount must be greater than 0.",
  PURCHASE_INVALID_MULTIPLE: "You can only buy lotto in multiples of 1,000.",
  WINNING_NUMBERS_INVALID: "Winning numbers should be positive integers",
  WINNING_NUMBERS_LENGTH: "There should be exactly 6 winning numbers",
  WINNING_NUMBERS_DUPLICATE: "Winning numbers should not contain duplicates",
  BONUS_NUMBER_INVALID: "Bonus number should be a positive integer",
  BONUS_NUMBER_DUPLICATE:
    "Bonus number cannot be a duplicate of the winning numbers",
};
