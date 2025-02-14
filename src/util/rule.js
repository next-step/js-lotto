export const RULES = {
  MIN_TICKET_NUMBER: 1,
  MAX_TICKET_NUMBER: 45,
  TICKET_PRICE: 1000,
  TICKET_LENGTH: 6,
};

export const LOTTO_RULES = {
  purChasePriceRule: (val) => val >= 1000 && val <= 100000,
  winningNumberRule: (val) => Array.isArray(val),
  bonusNumberRule: (val) =>
    Number.isInteger(val) &&
    val >= RULES.MIN_TICKET_NUMBER &&
    val <= RULES.MAX_TICKET_NUMBER,
};
