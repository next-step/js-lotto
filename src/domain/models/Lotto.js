import {
  ERROR_MESSAGES,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBERS_COUNT,
  LOTTO_PRICE,
} from "../../constants";

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
    const tickets = new Set();

    while (tickets.size < this.numberOfTickets) {
      const newTicket = this.generateRandomUniqueNumbers();

      tickets.add(JSON.stringify(newTicket));
    }

    // Set -> Array 변환
    return Array.from(tickets).map((ticket) => JSON.parse(ticket));
  }

  generateRandomUniqueNumbers() {
    let numbers = new Set();

    while (numbers.size < LOTTO_NUMBERS_COUNT) {
      numbers.add(Math.floor(Math.random() * LOTTO_MAX_NUMBER) + 1);
    }

    return [...numbers].sort((a, b) => a - b);
  }
}
