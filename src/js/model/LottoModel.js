export default class LottoModel {
	constructor() {
		this.payment = 0;
		this.lottoValues = [];
		this.winningNumbers = [];
	}

	init() {
		this.payment = 0;
		this.lottoValues = [];
		this.winningNumbers = [];
	}

	getPayment() {
		return this.payment;
	}

	setPayment(value) {
		this.payment = value;
	}

	getLottoValues() {
		return this.lottoValues;
	}

	setLottoValues(values) {
		this.lottoValues = [...values];
	}

	getWinningNumbers() {
		return this.winningNumbers;
	}

	setWinningNumbers(values) {
		this.winningNumbers = [...values];
	}
}