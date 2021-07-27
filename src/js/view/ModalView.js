export default class ModalView {
	constructor(model) {
		this.model = model;
		this.$modal = document.querySelector('.modal');
		this.registerCloseEvent();
	}

	registerCloseEvent() {
		const $modalClose = document.querySelector('.modal-close');
		$modalClose.addEventListener('click', () => this.remove());
	}

	getLottoResult(lottos, winningNumbers) {
		const numbers = winningNumbers.slice(0, 6);
		const bonusNumber = winningNumbers[6];
		const result = [];
		lottos.forEach((lotto) => {
			let count = 0;
			lotto.forEach((num) => {
				if (numbers.includes(num)) {
					count += 1;
				}

				if (num === bonusNumber) {
					count += 10;
				}
			});
			result.push(count);
		});
		return result;
	}

	render(lottos, winningNumbers) {
		this.$modal.classList.add('open');

		const $match3 = document.querySelector('.match-3-result');
		const $match4 = document.querySelector('.match-4-result');
		const $match5 = document.querySelector('.match-5-result');
		const $match5withBonus = document.querySelector('.match-5-with-bonus-result');
		const $match6 = document.querySelector('.match-6-result');
		const array = [
			{ td: $match3, price: 5000 },
			{ td: $match4, price: 50000 },
			{ td: $match5, price: 1500000 },
			{ td: $match5withBonus, price: 30000000 },
			{ td: $match6, price: 2000000000 },
		];
		const result = this.getLottoResult(lottos, winningNumbers);
		let money = 0;

		array.forEach((obj, i) => {
			const target = i === 3 ? 15 : i + 3;
			const count = result.filter((cnt) => cnt === target).length
			obj.td.innerText = `${count}개`;
			money += count * obj.price;
		});

		const $p = document.querySelector('.earning-rate');
		$p.innerText = `당신의 총 수익률은 ${((money - this.model.getPayment()) / this.model.getPayment()) * 100}%입니다.`;
	}

	remove() {
		this.$modal.classList.remove('open');
	}

	bindEvent(handler) {
		const $retryButton = document.querySelector('.retry');
		$retryButton.addEventListener('click', () => handler());
	}
}