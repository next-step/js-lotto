import LottoTicket from "./LottoTicket.js";

import { UserInputError } from "./Error.js";

const DEFAULT_PRICE = 1000;

export default class LottoVendor {
  #price;

  constructor(price = DEFAULT_PRICE) {
    if (typeof price !== "number") {
      throw new UserInputError("가격은 number 이어야 합니다.");
    }

    if (price <= 0) {
      throw new UserInputError("가격은 0보다 커야합니다.");
    }

    this.#price = price;
  }

  buy(payment, ticketRules) {
    if (typeof payment !== "number") {
      throw new UserInputError("지불 금액은 number 이어야 합니다.");
    }

    if (payment < 0) {
      throw new UserInputError("지불 금액은 0이상 이어야 합니다.");
    }

    const amount = Math.floor(payment / this.#price);
    const change = payment - amount * this.#price;
    const tickets = Array.from(
      { length: amount },
      () => new LottoTicket(ticketRules),
    );

    return { amount, change, price: this.#price, tickets };
  }
}
