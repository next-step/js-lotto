import PurchaseView from './views/purchase.view.js';
import TicketListView from './views/ticket-list.view.js';
import lottoStateService from './service/lotto-state.service.js';

export class App {
  constructor() {
    this.lottoState = lottoStateService();
  }

  start() {
    const purchaseView = new PurchaseView(this.lottoState);
    const listView = new TicketListView(this.lottoState);
  }
}
