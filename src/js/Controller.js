import CONSTANTS from './constants.js';

export default class Controller {
	constructor(pubsub) {
		this.pubsub = pubsub;
		this.registerSubscribes();
	}
	isNotDuplicatedExceptMe(num, index, arr) {
		return !arr.filter((_, idx) => index !== idx).includes(num);
	}
	registerSubscribes() {
		this.pubsub.subscribe('clickedResultBtn', (winningNumbersWithBonus) => {
			const isRegisterable = winningNumbersWithBonus.every(
				this.isNotDuplicatedExceptMe
			);
			if (!isRegisterable) {
				alert(CONSTANTS.MESSAGES.LOTTOS.DUPLICATED);
				return;
			}
			console.log(winningNumbersWithBonus);
		});
		this.pubsub.subscribe('ticketsCreated', (tickets) => {
			this.pubsub.publish('ticketUpdated', tickets);
		});
		this.pubsub.subscribe('purchase:input', (purchasePrice) => {
			if (purchasePrice % 1000 !== 0) {
				alert(CONSTANTS.MESSAGES.PURCHASE.INVALID_AMOUNT_UNIT_INPUT);
				this.pubsub.publish('purchase:reset');
				return;
			}
			const numberOfTickets = Math.floor(purchasePrice / 1000);
			this.pubsub
				.publish('tickets:create', numberOfTickets)
				.publish('ticketsView:show')
				.publish('lastWeekResultView:show');
		});
	}
}
