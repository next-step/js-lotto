import LOTTO_ERROR_MESSAGE from "../utils/errorMessage/lottoErrorMessage";

const ticketPrice = 1000;

class Lotto {
  #money;
  #ticket = [];

  constructor(money, createLottoTicket) {
    Lotto.validateLotto(money, createLottoTicket);
    this.#money = money;
    this.#ticket = this.makeLottoList(
      this.getTicketAmount(),
      createLottoTicket
    );
  }

  get money() {
    return this.#money;
  }

  static validateLotto(money, createLottoTicket) {
    if (money < ticketPrice) {
      throw new Error(LOTTO_ERROR_MESSAGE.MIN_ORDER_AMOUNT);
    }
    if (money % ticketPrice !== 0) {
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
    return this.#money / ticketPrice;
  }

  makeLottoList(length, createLottoTicket) {
    return new Array(length)
      .fill()
      .map(() => createLottoTicket().sort((a, b) => a - b));
  }
}

export default Lotto;
