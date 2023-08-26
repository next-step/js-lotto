import { ERROR_MESSAGE, LOTTO_MODE } from '../constants/index';
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

  #createAutoLottoTickets(count) {
    const lottoTickets = Array.from({ length: count }, () => new LottoTicket(LOTTO_MODE.AUTO));
    return lottoTickets;
  }

  #createManualLottoTickets(count, lottoNumber) {
    const lottoTickets = Array.from({ length: count }, () => new LottoTicket(LOTTO_MODE.MANUAL, lottoNumber));
    return lottoTickets;
  }

  sellToManualLottoTicket(amount, lottoNumber) {
    LottoSeller.validateLottoPurchaseAvailability(amount, this.#lottoPrice);
    const sellCount = this.#calculateSellCount(amount);
    const lottoTickets = this.#createManualLottoTickets(sellCount, lottoNumber);
    this.#increaseSellCount(sellCount);
    return { changeAmount: amount % this.#lottoPrice, lottoTickets };
  }

  sellToAutoLottoTicket(amount) {
    LottoSeller.validateLottoPurchaseAvailability(amount, this.#lottoPrice);
    const sellCount = this.#calculateSellCount(amount);
    const lottoTickets = this.#createAutoLottoTickets(sellCount);
    this.#increaseSellCount(sellCount);
    return { changeAmount: amount % this.#lottoPrice, lottoTickets };
  }
}

export default LottoSeller;
