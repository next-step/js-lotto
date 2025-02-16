import { LOTTO_PRICE } from "../../constants";

export class Lotto {
  totalAmount;
  numberOfTickets;

  constructor(totalAmount) {
    if (totalAmount <= 0) {
      throw new Error("Amount must be greater than 0.");
    }

    if (totalAmount % LOTTO_PRICE !== 0) {
      throw new Error("You can only buy lotto in multiples of 1,000.");
    }

    this.totalAmount = totalAmount;
    this.numberOfTickets = totalAmount / LOTTO_PRICE;
  }

  getNumberOfTickets() {
    return this.numberOfTickets;
  }
}
