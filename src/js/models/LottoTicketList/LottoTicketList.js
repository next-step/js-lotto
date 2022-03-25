import LottoTicket from "./LottoTicket.js";

class LottoTicketList {
  constructor({ quantity }) {
    this.quantity = quantity;
    this.lottoTicketList = [];
    this.#generateLottoTicket();
  }

  #generateLottoTicket() {
    this.lottoTicketList = Array.from({ length: this.quantity }).map(
      _ => new LottoTicket()
    );
  }

  getLottoTicketList() {
    return this.lottoTicketList;
  }
}

export default LottoTicketList;
