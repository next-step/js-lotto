import PURCHASE_HISTORY_RULES from "./rule.js";
import PURCHASE_HISTORY_ERRORS from "./error.js";

class PurchaseHistory {
  #tickets;

  constructor({ tickets }) {
    this.#setTickets(tickets, PURCHASE_HISTORY_RULES.ticketsRule);
  }

  #setTickets(tickets, predicate) {
    if (predicate(tickets) === false) {
      throw new Error(PURCHASE_HISTORY_ERRORS.NOT_CORRECT_TICKET);
    }
    this.#tickets = tickets;
  }

  get getTickets() {
    return this.#tickets;
  }
}

export default PurchaseHistory;
