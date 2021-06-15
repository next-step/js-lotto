import Payment from './Payment.js';

export default class Modal {
	constructor(data) {
		this.data = data;
		this.tickets = data.getTicketValues();
		this.winningNumbers = data.getWinningNumbers().slice(0, 7);
		this.bonusNumber = data.getWinningNumbers()[7];
		this.matchNum = Array.from({ length: this.tickets.length }, () => 0);
		this.price = 0;
		this.registerEvent();
		this.showModal();
	}

	registerEvent() {
		const $button = document.querySelector('.retry');
		$button.addEventListener('click', () => {
			this.removeModal();
			this.init();
		});

		const $modalClose = document.querySelector('.modal-close');
		$modalClose.addEventListener('click', () => this.removeModal());
	}

	showModal() {
		const $modal = document.querySelector('.modal');
		$modal.classList.add('open');
		this.setMatchNumber();
		this.renderResult();
	}

	setMatchNumber() {
		this.tickets.forEach((ticket, i) => {
			const values = [...ticket].sort((a, b) => a - b);
			values.forEach((val) => {
				if (this.winningNumbers.includes(val)) {
					this.matchNum[i] += 1;
				}

				if (val === this.bonusNumber) {
					this.matchNum[i] += 10;
				}
			});
		});
	}

	setPrice(price) {
		this.price += price;
	}

	renderEarningRate() {
		const rate = ((this.price - this.data.payment) / this.data.payment) * 100;
		const $p = document.querySelector('.earning-rate');
		$p.innerText = `당신의 총 수익률은 ${rate}%입니다.`;
	}

	renderResult() {
		const $tdMatch3 = document.querySelector('.match-3-result');
		const $tdMatch4 = document.querySelector('.match-4-result');
		const $tdMatch5 = document.querySelector('.match-5-result');
		const $tdMatch5WithBonus = document.querySelector('.match-5-with-bonus-result');
		const $tdMatch6 = document.querySelector('.match-6-result');
		const array = [
			{ $td: $tdMatch3, price: 5000 },
			{ $td: $tdMatch4, price: 50000 },
			{ $td: $tdMatch5, price: 1500000 },
			{ $td: $tdMatch5WithBonus, price: 30000000 },
			{ $td: $tdMatch6, price: 2000000000 },
		];

		array.forEach((el, i) => {
			const targetNum = i === 3 ? 15 : i + 3;
			const count = this.matchNum.filter((num) => num === targetNum).length;
			el.$td.innerText = `${count}개`;
			this.setPrice(el.price * count);
		});
		this.renderEarningRate();
	}

	removeModal() {
		const $modal = document.querySelector('.modal');
		$modal.classList.remove('open');
	}

	init() {
		this.data.init();
		
		const $div = document.querySelector('.div-w-100');
		$div.innerHTML = '<h1 class="text-center">🎱 행운의 로또</h1>';
		new Payment(this.data);
	}
}
