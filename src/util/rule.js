import Ticket from "../domain/Ticket.js";
import WinningDetail from "../domain/WinningDetail.js";

export const RULES = {
  MIN_TICKET_NUMBER: 1,
  MAX_TICKET_NUMBER: 45,
  MIN_LOTTO_PURCHASE_PRICE: 1000,
  MAX_LOTTO_PURCHASE_PRICE: 100_000,
  TICKET_PRICE: 1000,
  TICKET_LENGTH: 6,
  WINNING_PERSON_INITIAL: 1,
  WINNING_PERSON_PLUS: 1,
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

// 1~5등, 초기값, 5등 이후 키
export const WINNING_KEY = {
  INITIAL: 0,
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
  OTHER: -1,
};

// 수상할 수 있는 조건 키
export const WINNING_CONDITION_KEY = {
  FIRST_AND_SECOND: 6,
  THIRD: 5,
  FOURTH: 4,
  FIFTH: 3,
};

export const WINNING_PRICE_RULE = {
  1: 2_000_000_000,
  2: 30_000_000,
  3: 1_500_000,
  4: 50_000,
  5: 5_000,
};

export const RATES_OF_RETURN_RULE = {
  purchasePriceRule: (number) =>
    number >= RULES.MIN_LOTTO_PURCHASE_PRICE &&
    number <= RULES.MAX_LOTTO_PURCHASE_PRICE,
  winningDetailRule: (winningDetail) => winningDetail instanceof WinningDetail,
};
