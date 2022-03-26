export default class LottoTicket {
	#numbers;

	constructor(numbers) {
		this.#numbers = new Set(numbers);
	}

	get numbers() {
		return this.#numbers;
	}

	static create(numbers) {
		return new LottoTicket(numbers);
	}
}
