import InputPurchase from './views/input-purchase.js';
import LottoStateService from './service/lotto-state.service.js';
import TicketList from './views/ticket-list.js';

export class App {
  constructor() {
    this.lottoState = new LottoStateService();
  }

  start() {
    const inputPurchase = new InputPurchase(this.lottoState);
    const list = new TicketList(this.lottoState);
  }
}
