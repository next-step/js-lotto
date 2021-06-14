export default class Modal {
	constructor(data) {
		this.data = data;
		this.tickets = data.getTicketValues();
		this.winningNumbers = data.getWinningNumbers();
		this.$modal = document.querySelector('.modal');
		this.showModal();
	}

	showModal() {
		this.$modal.classList.add('open');
	}

	renderResult() {
		//
	}

	checkMatchNumbers() {
		//
	}

	removeModal() {
		this.$modal.classList.remove('open');
	}
}
