import Tickets from './Tickets.js';
import { MINIMUM_PAYMENT_MESSAGE, MAXIMUM_PAYMENT_MESSAGE, PAYMENT_UNIT_ERROR_MESSAGE } from './utils/contants.js';
import WinningNumber from './WinningNumber.js';

export default class Payment {
	constructor(data) {
		this.data = data;
		this.payment = data.getPayment();

		this.render();
		this.registerEvents();
	}

	render() {
		const $form = document.createElement('form');
		$form.innerHTML = `
			<label class="mb-2 d-inline-block">
				구입할 금액을 입력해주세요.
			</label>
			<div class="d-flex">
				<input
					type="number"
					class="w-100 mr-2 pl-2 payment-input"
					placeholder="구입 금액"
				/>
				<button type="button" class="btn btn-cyan payment-button">확인</button>
			</div>
		`;

		const $div = document.querySelector('.div-w-100');
		$div.appendChild($form);
	}

	registerEvents() {
		const $input = document.querySelector('.payment-input');
		const $button = document.querySelector('.payment-button');
		$input.addEventListener('keypress', (event) => {
			if (event.key !== 'Enter') {
				return;
			}
	
			event.preventDefault();
			this.checkPayment(+event.target.value);
		});
		$button.addEventListener('click', () => this.checkPayment(+$input.value));
	}

	checkPayment(value) {
		let alertFlag = false;
		if (value < 1000) {
			alert(MINIMUM_PAYMENT_MESSAGE);
			alertFlag = true;
		} else if (value > 100000) {
			alert(MAXIMUM_PAYMENT_MESSAGE);
			alertFlag = true;
		} else if (value % 1000 !== 0) {
			alert(PAYMENT_UNIT_ERROR_MESSAGE);
			alertFlag = true;
		}

		if (alertFlag) {
			document.querySelector('.payment-input').value = '';
			return;
		}

		this.data.setPayment(value);
		this.renderTickets();
		this.renderWinningNumber();
	}

	renderTickets() {
		new Tickets(this.data);
	}

	renderWinningNumber() {
		new WinningNumber(this.data);
	}
}
