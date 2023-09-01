import { Validator } from '../utils/Validator';
import { LottoTicket } from './LottoTicket';
import { NUMBER, RADIX } from '../constants';

/**
 * 구입 금액을 전달받아 수량에 맞는 로또 티켓을 판매하는 객체입니다.
 */
export class LottoStore {
  #ticket = LottoTicket;
  #price = NUMBER.DEFAULT_TICKET_PRICE;

  buyTickets(purchaseAmount) {
    Validator.LottoStore.validatePurchaseAmount(purchaseAmount);
    const quatities = parseInt(purchaseAmount / this.#price, RADIX.BASE_10);

    return Array.from({ length: quatities }, () => {
      return new this.#ticket();
    });
  }
}
