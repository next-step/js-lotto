import LottoTicket from "./LottoTicket";

export default class LottoVendor {
  #price;
  #defaultPrice = 1000;

  constructor(price) {
    if (price !== undefined && typeof price !== "number") {
      throw new Error("가격은 number 이어야 합니다.");
    }

    this.#price =
      price <= 0 || price === undefined ? this.#defaultPrice : Number(price);
  }

  get price() {
    return this.#price;
  }

  get defaultPrice() {
    return this.#defaultPrice;
  }

  buy(payment, ticketRules) {
    if (typeof payment !== "number") {
      throw new Error("지불 금액은 number 이어야 합니다.");
    }

    if (payment < 0) {
      throw new Error("지불 금액은 0이상 이어야 합니다.");
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
