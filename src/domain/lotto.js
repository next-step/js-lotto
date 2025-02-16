import LOTTO_ERROR_MESSAGE from "../utils/errorMessage/lottoErrorMessage";

const ticketPrice = 1000;

class Lotto {
  #money;
  #ticket = [];

  constructor(money, lottoTicketClass) {
    Lotto.validateLotto(money, lottoTicketClass);
    this.#money = money;
    this.#ticket = this.makeLottoList(this.getTicketAmount(), lottoTicketClass);
  }

  get money() {
    return this.#money;
  }

  static validateLotto(money, lottoTicketClass) {
    if (money < ticketPrice) {
      throw new Error(LOTTO_ERROR_MESSAGE.INVALID_ORDER_AMOUNT_UNIT);
    }
    if (money % ticketPrice !== 0) {
      throw new Error(LOTTO_ERROR_MESSAGE.INVALID_ORDER_AMOUNT_UNIT);
    }
    if (!lottoTicketClass) {
      throw new Error(LOTTO_ERROR_MESSAGE.LOTTO_ISSUANCE_ERROR);
    }
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
