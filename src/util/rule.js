import Ticket from "../domain/Ticket.js";
import WinningDetail from "../domain/WinningDetail.js";

export const RULES = {
  MIN_TICKET_NUMBER: 1,
  MAX_TICKET_NUMBER: 45,
  MIN_LOTTO_PURCHASE_PRICE: 1000,
  MAX_LOTTO_PURCHASE_PRICE: 100000,
  TICKET_PRICE: 1000,
  TICKET_LENGTH: 6,
};

export const TICKET_RULES = {
  numbersRule: (numbers) =>
    numbers.every(
      (number) =>
        Number.isInteger(number) &&
        number >= RULES.MIN_TICKET_NUMBER &&
        number <= RULES.MAX_TICKET_NUMBER,
    ),
};

export const LOTTO_RULES = {
  purChasePriceRule: (number) =>
    number >= RULES.MIN_LOTTO_PURCHASE_PRICE &&
    number <= RULES.MAX_LOTTO_PURCHASE_PRICE,
  winningNumberRule: (numbers) =>
    Array.isArray(numbers) &&
    numbers.every((number) => {
      return (
        Number.isInteger(number) &&
        number >= RULES.MIN_TICKET_NUMBER &&
        number <= RULES.MAX_TICKET_NUMBER
      );
    }),
  bonusNumberRule: (val) =>
    Number.isInteger(val) &&
    val >= RULES.MIN_TICKET_NUMBER &&
    val <= RULES.MAX_TICKET_NUMBER,
};

export const PURCHASE_HISTORY_RULES = {
  ticketsRule: (tickets) => tickets.every((ticket) => ticket instanceof Ticket),
};

export const getTicketAvailable = (purchasePrice) =>
  Math.floor(purchasePrice / RULES.TICKET_PRICE);

export const WINNING_PRICE_RULE = {
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
};

export const RATES_OF_RETURN_RULE = {
  purchasePriceRule: (number) =>
    number >= RULES.MIN_LOTTO_PURCHASE_PRICE &&
    number <= RULES.MAX_LOTTO_PURCHASE_PRICE,
  winningDetailRule: (winningDetail) => winningDetail instanceof WinningDetail,
};
