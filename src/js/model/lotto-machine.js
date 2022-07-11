import { isValidPurchasable } from '../validation/index.js';
import { getNumberOfLottoTickets, getLottoNumbers } from '../utils/index.js';
import executeAlert from '../ui/alert.js';
import LottoTicket from './lotto-ticket.js';

export default class LottoMachine {
  #unitPrice = 1000;

  #lottoTickets = [];

  get lottoTickets() {
    return this.#lottoTickets;
  }

  isPurchasedLottoTickets() {
    return this.#lottoTickets.length > 0;
  }

  getLottoTickets = (numberOfLottoTickets) => {
    const tickets = [];
    for (let i = 0; i < numberOfLottoTickets; i++) {
      const numbers = getLottoNumbers();
      const ticket = new LottoTicket(numbers);
      tickets.push(ticket);
    }
    return tickets;
  };

generateLottoTicketByAutomatic(amount) {
  if (!isValidPurchasable(amount, this.#unitPrice)) {
    executeAlert(
      `로또 구입 금액을 ${this.#unitPrice.toLocaleString(
        'ko-KR'
      )}원 단위로 입력해 주세요.`
    );

    return;
  }
  
  const numberOfLottoTickets = getNumberOfLottoTickets(
    amount,
    this.#unitPrice
  );

  this.#lottoTickets = this.getLottoTickets(numberOfLottoTickets);
}
