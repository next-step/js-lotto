const ticketPrice = 1000;

class Lotto {
  #money;
  #ticket = [];

  constructor(money, lottoTicketClass) {
    this.#money = money;
    this.#ticket = this.makeLottoList(this.getTicketAmount(), lottoTicketClass);
  }

  get money() {
    return this.#money;
  }

  getLottoTicket() {
    return this.#ticket;
  }

  getTicketAmount() {
    return this.#money / ticketPrice;
  }

  makeLottoList(length, lottoTicketClass) {
    return new Array(length)
      .fill()
      .map(() => new lottoTicketClass())
      .sort((a, b) => a - b);
  }
}

export default Lotto;
