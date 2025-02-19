export const TICKET_UNIT = 1000;
export const LOTTO_NUMBERS_COUNT = 6;
export const LOTTO_NUMBER_RANGE = { min: 1, max: 45 };

export const ERROR_MESSAGES = {
  PURCHASE_INVALID_AMOUNT:
    "Amount must be greater than 0 and multiples of 1,000.",
  WINNING_NUMBERS_INVALID:
    "Winning numbers should be 6 integers between 1 and 45",
  WINNING_NUMBERS_LENGTH: "There should be exactly 6 winning numbers",
  WINNING_NUMBERS_DUPLICATE: "Winning numbers should not contain duplicates",
  BONUS_NUMBER_INVALID: "Bonus number should be an integer between 1 and 45",
  BONUS_NUMBER_DUPLICATE:
    "Bonus number cannot be a duplicate of the winning numbers",
};

export const PRIZE_MONEY = {
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
};
