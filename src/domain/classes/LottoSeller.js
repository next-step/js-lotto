import { ERROR_MESSAGE, LOTTO_MODE } from '../constants/index';
import LottoTicket from './LottoTicket';

class LottoSeller {
  #sellCount = 0;
  #lottoPrice = 0;

  constructor(lottoPrice) {
    this.#lottoPrice = lottoPrice;
  }

  get sellCount() {
    return this.#sellCount;
  }

  #validateLottoPurchaseAvailability(amount, lottoPrice) {
    if (amount < lottoPrice) {
      throw ERROR_MESSAGE.NOT_ENOUGH_AMOUNT;
    }
  }

  #increaseSellCount(sellCount) {
    this.#sellCount += sellCount;
  }

  #calculateSellCount(amount) {
    return Math.floor(amount / this.#lottoPrice);
  }

  #createAutoLottoTickets(count) {
    const lottoTickets = Array.from({ length: count }, () => new LottoTicket(LOTTO_MODE.AUTO));
    return lottoTickets;
  }

  #createManualLottoTickets(count, lottoNumber) {
    const lottoTickets = Array.from({ length: count }, () => new LottoTicket(LOTTO_MODE.MANUAL, lottoNumber));
    return lottoTickets;
  }

  #sellTickets(amount, createTicket) {
    this.#validateLottoPurchaseAvailability(amount, this.#lottoPrice);
    const sellCount = this.#calculateSellCount(amount);
    const lottoTickets = createTicket(sellCount);
    this.#increaseSellCount(sellCount);
    return { changeAmount: amount % this.#lottoPrice, lottoTickets };
  }

  sellToManualLottoTicket(amount, lottoNumber) {
    return this.#sellTickets(amount, (sellCount) => this.#createManualLottoTickets(sellCount, lottoNumber));
  }

  sellToAutoLottoTicket(amount) {
    return this.#sellTickets(amount, this.#createAutoLottoTickets.bind(this));
  }
}

export default LottoSeller;
