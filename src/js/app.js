import StateManager from './state-manager.js';
import PurchaseView from './views/purchase.view.js';
import TicketListView from './views/ticket-list.view.js';

export class App {
  constructor() {
    this.lottoState = new StateManager();
  }

  start() {
    const purchaseView = new PurchaseView(this.lottoState);
    const listView = new TicketListView(this.lottoState);
  }
}
