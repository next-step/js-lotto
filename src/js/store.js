class Store {
	constructor(purchaseAmount = 0, lottoNumbers = [], winningNumbers = []) {
		this.purchaseAmount = purchaseAmount;
		this.lottoNumbers = lottoNumbers;
		this.winningNumbers = winningNumbers;
	}

	setLotto(lottoNumbers) {
		this.lottoNumbers = lottoNumbers;
	}

	setWinningNumbers(index, winningNumber) {
		this.winningNumbers[index] = parseInt(winningNumber, 10);
	}

	setPurchaseAmount(purchaseAmount) {
		this.purchaseAmount = purchaseAmount;
	}

	reset() {
		this.purchaseAmount = 0;
		this.lottoNumbers = [];
		this.winningNumbers = [];
	}
}

export default Store;
