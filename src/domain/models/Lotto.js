import {
  ERROR_MESSAGES,
  LOTTO_NUMBER_RANGE,
  LOTTO_NUMBERS_COUNT,
  TICKET_UNIT,
} from "../../constants.js";
import { isValidPurchaseAmount } from "../../validation.js";

export class Lotto {
  totalAmount;
  numberOfTickets;

  constructor(totalAmount) {
    if (!isValidPurchaseAmount(totalAmount, TICKET_UNIT)) {
      throw new Error(ERROR_MESSAGES.PURCHASE_INVALID_AMOUNT);
    }

    this.totalAmount = totalAmount;
    this.numberOfTickets = totalAmount / TICKET_UNIT;
  }

  getNumberOfTickets() {
    return this.numberOfTickets;
  }

  generateLottoTickets() {
    const tickets = new Map();

    while (tickets.size < this.numberOfTickets) {
      const newTicket = this.generateRandomUniqueNumbers();
      const key = newTicket.join(",");

      if (!tickets.has(key)) {
        tickets.set(key, newTicket);
      }
    }

    return Array.from(tickets.values());
  }

  generateRandomUniqueNumbers() {
    const numberPool = Array.from(
      { length: LOTTO_NUMBER_RANGE.max },
      (_, i) => i + 1,
    );

    for (let i = numberPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numberPool[i], numberPool[j]] = [numberPool[j], numberPool[i]];
    }

    return numberPool.slice(0, LOTTO_NUMBERS_COUNT).sort((a, b) => a - b);
  }
}
