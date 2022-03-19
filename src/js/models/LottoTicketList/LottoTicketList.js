import LottoTicket from "./LottoTicket.js";

class LottoTicketList {
  constructor({ quantity }) {
    this.quantity = quantity;
    this.lottoTicketList = [];
    this.#generateLottoTicket();
  }

  #generateLottoTicket() {
    let quantity = this.quantity;

    while (quantity > 0) {
      const lottoTicket = new LottoTicket();
      this.lottoTicketList.push(lottoTicket);
      quantity--;
    }
  }

  getLottoTicketList() {
    return this.lottoTicketList;
  }
}

export default LottoTicketList;
