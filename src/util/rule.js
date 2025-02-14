export const RULES = {
  MIN_TICKET_NUMBER: 1,
  MAX_TICKET_NUMBER: 45,
  MIN_LOTTO_PURCHASE_PRICE: 1000,
  MAX_LOTTO_PURCHASE_PRICE: 100000,
  TICKET_PRICE: 1000,
  TICKET_LENGTH: 6,
};

export const TICKET_RULES = {
  numbersRule: (val) =>
    val.every(
      (val) =>
        Number.isInteger(val) &&
        val >= RULES.MIN_TICKET_NUMBER &&
        val <= RULES.MAX_TICKET_NUMBER,
    ),
};

export const LOTTO_RULES = {
  purChasePriceRule: (val) =>
    val >= RULES.MIN_LOTTO_PURCHASE_PRICE &&
    val <= RULES.MAX_LOTTO_PURCHASE_PRICE,
  winningNumberRule: (val) => Array.isArray(val),
  bonusNumberRule: (val) =>
    Number.isInteger(val) &&
    val >= RULES.MIN_TICKET_NUMBER &&
    val <= RULES.MAX_TICKET_NUMBER,
};
