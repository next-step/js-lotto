import { RULES } from "../../util/rule.js";

export const TICKET_RULES = {
  numbersRule: (numbers) =>
    numbers.every(
      (number) =>
        Number.isInteger(number) &&
        number >= RULES.MIN_TICKET_NUMBER &&
        number <= RULES.MAX_TICKET_NUMBER,
    ),
};

export const getTicketAvailable = (purchasePrice) =>
  Math.floor(purchasePrice / RULES.TICKET_PRICE);
