import Ticket from "../Ticket/index.js";

export const PURCHASE_HISTORY_RULES = {
    ticketsRule: (tickets) => tickets.every((ticket) => ticket instanceof Ticket),
  };