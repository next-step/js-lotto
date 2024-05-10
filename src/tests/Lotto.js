import { ConstantNumbers } from './constant';

class Lotto {
	price = ConstantNumbers.LOTTO_PRICE;
	quantity;
	purchaseAmount;

	winningNumbers = Array.from(
		{ length: ConstantNumbers.MAX_NUMBER - ConstantNumbers.MIN_NUMBER + 1 },
		(_, i) => i + ConstantNumbers.MIN_NUMBER
	);

	winningResult = [];

	constructor(quantity) {
		this.quantity = quantity;
	}

	purchase(purchaseAmount) {
		// 구매 금액을 로또 가격으로 나눈 몫이 quantity
		this.quantity = purchaseAmount / this.price;
		return this.quantity;
	}

	getWinningNumbers() {
		this.winningResult = [];

		for (let i = 0; i < ConstantNumbers.COUNT; i++) {
			const randomIndex = Math.floor(
				Math.random() * this.winningNumbers.length
			);
			this.winningResult.push(this.winningNumbers[randomIndex]);
			this.winningNumbers.splice(randomIndex, 1);
		}

		return this.winningResult;
	}

	getBonusNumber() {
		const availableNumber = this.winningNumbers.filter(
			num => !this.winningResult.includes(num)
		);

		const randomIndex = Math.floor(Math.random() * availableNumber.length);

		return availableNumber[randomIndex];
	}
}

export default Lotto;
