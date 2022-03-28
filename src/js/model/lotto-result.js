export default class LottoResult {
	#winningNumbers;
	#bonusNumber;

	constructor({winningNumbers, bonusNumber}) {
		this.#winningNumbers = new Set(winningNumbers);
		this.#bonusNumber = bonusNumber;
	}

	get winningNumbers() {
		return this.#winningNumbers;
	}

	get bonusNumber() {
		return this.#bonusNumber;
	}

	static create({winningNumbers, bonusNumber}) {
		return new LottoResult({winningNumbers, bonusNumber});
	}
}
