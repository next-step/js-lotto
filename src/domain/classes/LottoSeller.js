import { ERROR_MESSAGE } from '../constants/index';
import LottoTicket from './LottoTicket';

class LottoSeller {
  #sellCount = 0;
  #lottoPrice = 0;

  constructor(lottoOrganizer) {
    this.#lottoPrice = lottoOrganizer.lottoPrice;
  }

  static validateLottoPurchaseAvailability(amount, lottoPrice) {
    if (amount < lottoPrice) {
      throw ERROR_MESSAGE.NOT_ENOUGH_AMOUNT;
    }
  }

  get sellCount() {
    return this.#sellCount;
  }

  #increaseSellCount(sellCount) {
    this.#sellCount += sellCount;
  }

  #calculateSellCount(amount) {
    return Math.floor(amount / this.#lottoPrice);
  }

  #createLottoTickets(count, lottoMode) {
    const lottoTickets = Array.from({ length: count }, () => new LottoTicket(lottoMode));
    return lottoTickets;
  }

  sellToLottoTicket(amount, lottoMode) {
    LottoSeller.validateLottoPurchaseAvailability(amount, this.#lottoPrice);
    const sellCount = this.#calculateSellCount(amount);
    const lottoTickets = this.#createLottoTickets(sellCount, lottoMode);
    this.#increaseSellCount(sellCount);
    return { changeAmount: amount % this.#lottoPrice, lottoTickets };
  }
}

export default LottoSeller;
