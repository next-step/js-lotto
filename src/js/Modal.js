export default class Modal {
	constructor(data) {
		this.data = data;
		this.tickets = data.getTicketValues();
		this.winningNumbers = data.getWinningNumbers();
		this.matchResult = {};
		this.$modal = document.querySelector('.modal');
		this.showModal();
	}

	showModal() {
		this.$modal.classList.add('open');
		this.checkMatchNumbers();
	}

	checkMatchNumbers() {
		this.tickets.forEach((ticket) => {
			const values = [...ticket].sort((a, b) => a - b);
			console.log(values);
		});
	}

	renderResult() {
		//
	}

	removeModal() {
		this.$modal.classList.remove('open');
	}
}
