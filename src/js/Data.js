function get6RandomNumber() {
	const randoms = [];
	for (let i = 0; i < 6; i++) {
		const random = Math.floor(Math.random() * 45) + 1;
		if (randoms.find((num) => num === random) === undefined) {
			randoms.push(random);
		}
	}
	return randoms;
}

export default class Data {
	constructor() {
		this.payment = 0;
		this.ticketNumber = 0;
		this.ticketValues = [];
		this.winningNumbers = [];
	}

	init() {
		this.payment = 0;
		this.ticketNumber = 0;
		this.ticketValues = [];
		this.winningNumbers = [];
	}

	getPayment() {
		return this.payment;
	}

	getTicketNumber() {
		return this.ticketNumber;
	}

	getTicketValues() {
		return this.ticketValues;
	}

	getWinningNumbers() {
		return this.winningNumbers;
	}

	setPayment(payment) {
		this.payment = payment;
		this.setTicketNumber();
		this.setTicketValues();
	}

	setTicketNumber() {
		this.ticketNumber = this.payment / 1000;
	}

	setTicketValues() {
		for (let i = 0; i < this.ticketNumber; i++) {
			this.ticketValues.push(get6RandomNumber());
		}
	}

	setWinningNumbers(numbers) {
		this.winningNumbers = [...numbers];
	}
}