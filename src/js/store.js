class Store {
	constructor(amount, lotto) {
		this.amount = amount;
		this.lotto = lotto;
	}

	setLotto(lottoNumber) {
		this.lotto = lottoNumber;
	}
}

export default Store;
