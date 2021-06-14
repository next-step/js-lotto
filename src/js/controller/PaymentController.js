import { MAXIMUM_PAYMENT_MESSAGE, MINIMUM_PAYMENT_MESSAGE, PAYMENT_UNIT_ERROR_MESSAGE } from '../utils/contants.js';

export default class PaymentController {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		this.registerEvents();
	}

	registerEvents() {
		const $input = document.querySelector('.payment-input');
		const $button = document.querySelector('.payment-button');

		$input.addEventListener('keypress', (event) => {
			if (event.key !== 'Enter') {
				return;
			}
			
			event.preventDefault();
			const value = +event.target.value;
			this.checkPayment(value)
		});
		$button.addEventListener('click', () => this.checkPayment(+$input.value));
	}

	checkPayment(value) {
		if (value > 100000) {
			alert(MAXIMUM_PAYMENT_MESSAGE);
		} else if (value < 1000) {
			alert(MINIMUM_PAYMENT_MESSAGE)
		} else {
			this.setPayment(value);
		}
	}

	setPayment(value) {
		this.model.setPayment(value);
		if (value % 1000 !== 0) {
			alert(PAYMENT_UNIT_ERROR_MESSAGE);
			this.model.setPayment(0);
			return;
		}
	}
}
