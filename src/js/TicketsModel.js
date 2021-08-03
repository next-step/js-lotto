export default class TicketsModel {
	constructor(pubsub) {
		this.pubsub = pubsub;
		this.tickets = [];
		this.winningTicket = [];
		this.registerSubcribe();
	}
	registerSubcribe() {
		this.pubsub
			.subscribe('tickets:create', this.createTickets.bind(this))
			.subscribe('toggleSwich', () => {
				this.pubsub.publish('ticketsGiven', this.tickets);
			});
	}
	createTickets(numberOfTickets) {
		this.tickets = [];
		for (let i = 0; i < numberOfTickets; i++) {
			this.tickets.push(this._createTicket());
		}
		console.log(this.tickets);
		this.pubsub.publish('ticketsCreated', this.tickets);
	}
	_createTicket() {
		const size = 45;
		const lottoSize = 6;
		const nums = Array.from(Array(size), (_, i) => i + 1);
		const lottoNums = [];
		while (lottoNums.length < lottoSize) {
			const index = Math.floor(Math.random() * nums.length);
			lottoNums.push(nums.splice(index, 1)[0]);
		}
		return lottoNums;
	}
}
