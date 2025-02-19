import RULES from "../../util/rule.js";

const LOTTO_RULES = {
  purChasePriceRule: (number) =>
    number >= RULES.MIN_LOTTO_PURCHASE_PRICE &&
    number <= RULES.MAX_LOTTO_PURCHASE_PRICE,

  winningNumberRule: (numbers) =>
    Array.isArray(numbers) &&
    new Set(numbers).size === RULES.TICKET_LENGTH &&
    numbers.every(
      (number) =>
        Number.isInteger(number) &&
        number >= RULES.MIN_TICKET_NUMBER &&
        number <= RULES.MAX_TICKET_NUMBER,
    ),

  bonusNumberRule: (val) =>
    Number.isInteger(val) &&
    val >= RULES.MIN_TICKET_NUMBER &&
    val <= RULES.MAX_TICKET_NUMBER,
};

export default LOTTO_RULES;
