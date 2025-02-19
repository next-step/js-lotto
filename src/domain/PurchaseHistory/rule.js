import Ticket from "../Ticket/index.js";

const PURCHASE_HISTORY_RULES = {
  ticketsRule: (tickets) => tickets.every((ticket) => ticket instanceof Ticket),
};

export default PURCHASE_HISTORY_RULES;
