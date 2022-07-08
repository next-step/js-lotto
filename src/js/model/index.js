import { NoDuplicationNumberPicker } from "./no-duplication-number-picker.js";

export class LottoModel {
  #price;
  #tickets;
  #winningNumber;

  #numberPicker;

  constructor({ numberLenght, maxValue, price }) {
    this.#price = price;
    this.#tickets = [];

    this.#numberPicker = new NoDuplicationNumberPicker({
      maxValue,
      length: numberLenght,
    });
  }

  isPriceUnit(payment) {
    return payment % this.#price === 0;
  }

  autoBuy(payment) {
    const numberOfTickets = Math.floor(payment / this.#price);

    for (let i = 0; i < numberOfTickets; i++) {
      const ticket = this.#numberPicker.pick();
      this.#tickets.push(ticket);
    }
  }

  tickets() {
    return this.#tickets;
  }
}
