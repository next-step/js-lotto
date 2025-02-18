import {
  ERROR_MESSAGES,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBERS_COUNT,
  LOTTO_PRICE,
} from "../../constants.js";

export class Lotto {
  totalAmount;
  numberOfTickets;

  constructor(totalAmount) {
    if (totalAmount <= 0) {
      throw new Error(ERROR_MESSAGES.PURCHASE_INVALID_AMOUNT);
    }

    if (totalAmount % LOTTO_PRICE !== 0) {
      throw new Error(ERROR_MESSAGES.PURCHASE_INVALID_MULTIPLE);
    }

    this.totalAmount = totalAmount;
    this.numberOfTickets = totalAmount / LOTTO_PRICE;
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
      { length: LOTTO_MAX_NUMBER },
      (_, i) => i + 1,
    );

    for (let i = numberPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numberPool[i], numberPool[j]] = [numberPool[j], numberPool[i]];
    }

    return numberPool.slice(0, LOTTO_NUMBERS_COUNT).sort((a, b) => a - b);
  }
}
