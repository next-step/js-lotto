import Controller from './Controller.js';
import PubSub from './Pubusb.js';
import TicketsModel from './TicketsModel.js';
import LastWeekResult from './views/LastWeekResult.js';
import PurchaseInputView from './views/PurchaseInputView.js';
import TicketsView from './views/TicketsView.js';

export default class App {
	constructor() {
		this.pubsub = new PubSub();
		this.controller = new Controller(this.pubsub);
		this.views = {
			purchaseInputView: new PurchaseInputView(this.pubsub, 'purchase'),
			ticketsView: new TicketsView(this.pubsub, 'tickets'),
			lastWeekResult: new LastWeekResult(this.pubsub, 'last-week-result'),
		};
		this.model = new TicketsModel(this.pubsub);
	}
}
