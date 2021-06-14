export default class PaymentModel {
	constructor() {
		this.payment = 0;
	}

	getPayment() {
		return this.payment;
	}

	setPayment(value) {
		this.payment = value;
	}
}
