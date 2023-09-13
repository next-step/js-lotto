import { ERROR_MESSAGE } from '../constants/index';
import { isPositiveNumber } from '../../utils/index';

class LottoCustomer {
  #lottoTickets = [];
  #amount = 0;

  constructor(amount) {
    this.#validateAmount(amount);
    this.#amount = Number(amount);
  }

  get amount() {
    return this.#amount;
  }

  get lottoTickets() {
    return this.#lottoTickets;
  }

  #validateAmount(amount) {
    if (!isPositiveNumber(amount)) {
      throw ERROR_MESSAGE.INVALID_AMOUNT_BY_NOT_POSITIVE_AMOUNT;
    }
  }

  #setLottoTickets(lottoTickets) {
    this.#lottoTickets = lottoTickets;
  }
  #setAmount(amount) {
    this.#amount = amount;
  }

  buyManualLottoTicket(lottoSeller, lottoNumber) {
    const { changeAMount, lottoTickets } = lottoSeller.sellToManualLottoTicket(this.#amount, lottoNumber);
    this.#setAmount(changeAMount);
    this.#setLottoTickets(lottoTickets);
  }

  buyAutoLottoTicket(lottoSeller) {
    const { changeAMount, lottoTickets } = lottoSeller.sellToAutoLottoTicket(this.#amount);
    this.#setAmount(changeAMount);
    this.#setLottoTickets(lottoTickets);
  }
}

export default LottoCustomer;
