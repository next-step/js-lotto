import Ticket from './Ticket.js';

function get6RandomNumber() {
	const randoms = [];
	for (let i = 0; i < 6; i++) {
		randoms.push(Math.floor(Math.random() * 45) + 1);
	}
	return randoms;
}

export default class Tickets {
	constructor(data) {
		this.data = data;
		this.num = data.getTicketNumber();
		this.isExpanded = false;
		this.tickets = Array.from({ length: this.num }, (_, i) => new Ticket(data.getTicketValues()[i]));
		this.render();
		this.registerEvents();
	}

	render() {
		const $section = document.createElement('section');
		$section.className = 'mt-9 ticket-section';
		$section.innerHTML = `
			<div class="d-flex">
				<label class="flex-auto my-0">총 ${this.num}개를 구매하였습니다.</label>
				<div class="flex-auto d-flex justify-end pr-1">
				<label class="switch">
					<input type="checkbox" class="lotto-numbers-toggle-button" />
					<span class="text-base font-normal">번호보기</span>
				</label>
				</div>
			</div>
			<div class="d-flex flex-wrap ticket-list">
				${this.tickets.map((ticket) => ticket.render(this.isExpanded)).join('')}
			</div>
		`;

		const $div = document.querySelector('.div-w-100');
		$div.appendChild($section);
	}

	registerEvents() {
		const $toggle = document.querySelector('.lotto-numbers-toggle-button');
		$toggle.addEventListener('change', () => this.setIsExpanded());
	}

	setIsExpanded() {
		this.isExpanded = !this.isExpanded;
		this.showTicketNumbers();
	}

	showTicketNumbers() {
		const $div = document.querySelector('.ticket-list');
		$div.innerHTML = this.tickets.map((ticket) => ticket.render(this.isExpanded)).join('');
	}
}
