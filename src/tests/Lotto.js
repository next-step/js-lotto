import { ConstantNumbers } from './constant';

class Lotto {
	price = ConstantNumbers.LOTTO_PRICE;
	qty;
	purchaseAmount;

	constructor(qty) {
		this.qty = qty;
	}

	purchase(purchaseAmount) {
		// 구매 금액을 로또 가격으로 나눈 몫이 qty
		this.qty = purchaseAmount / this.price;
		return this.qty;
	}

	getWinningNumbers() {
		const numbers = Array.from(
			{ length: ConstantNumbers.MAX_NUMBER - ConstantNumbers.MIN_NUMBER + 1 },
			(_, i) => i + ConstantNumbers.MIN_NUMBER
		);
		const result = [];

		for (let i = 0; i < ConstantNumbers.COUNT; i++) {
			const randomIndex = Math.floor(Math.random() * numbers.length);
			result.push(numbers[randomIndex]);
			numbers.splice(randomIndex, 1);
		}

		return result;
	}
}

export default Lotto;
