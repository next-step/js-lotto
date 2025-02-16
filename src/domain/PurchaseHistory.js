import { PURCHASE_HISTORY_RULES } from "../util/rule.js";

class PurchaseHistory {
  #tickets;

  constructor({ tickets }) {
    this.#setTickets(tickets, PURCHASE_HISTORY_RULES.ticketsRule);
  }

  #setTickets(tickets, predicate) {
    if (predicate(tickets) === false) {
      throw new Error("티켓이 올바르지 않아요.");
    }
    this.#tickets = tickets;
  }

  get getTickets() {
    return this.#tickets;
  }
}

export default PurchaseHistory;
