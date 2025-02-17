import LOTTO_ERROR_MESSAGE from "./lottoErrorMessage.js";
import { TICKET_PRICE } from "../LottoStatistics/constant.js";

class Lotto {
  #money;
  #ticket = [];

  constructor(money, createLottoTicket) {
    Lotto.validateLotto(money, createLottoTicket);
    this.#money = money;
    this.#ticket = this.generateTickets(createLottoTicket);
  }

  get money() {
    return this.#money;
  }

  static validateLotto(money, createLottoTicket) {
    if (money < TICKET_PRICE) {
      throw new Error(LOTTO_ERROR_MESSAGE.MIN_ORDER_AMOUNT);
    }
    if (money % TICKET_PRICE !== 0) {
      throw new Error(LOTTO_ERROR_MESSAGE.INVALID_ORDER_AMOUNT_UNIT);
    }
    if (!createLottoTicket) {
      throw new Error(LOTTO_ERROR_MESSAGE.LOTTO_ISSUANCE_ERROR);
    }
  }

  getLottoTicket() {
    return this.#ticket;
  }

  getTicketAmount() {
    return this.#money / TICKET_PRICE;
  }

  generateTickets(createLottoTicket) {
    return new Array(this.getTicketAmount())
      .fill()
      .map(() => createLottoTicket());
  }
}

export default Lotto;
