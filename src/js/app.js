import LottoStateService from './service/lotto-state.service.js';
import TicketList from './views/ticket-list.js';
import PurchaseView from './views/purchase.view.js';

export class App {
  constructor() {
    this.lottoState = new LottoStateService();
  }

  start() {
    const purchaseView = new PurchaseView(this.lottoState);
    const list = new TicketList(this.lottoState);
  }
}
