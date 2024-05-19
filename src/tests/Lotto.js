import { ConstantNumbers } from './constant';

const createLottoNumbersArray = () => {
	return Array.from(
		{ length: ConstantNumbers.MAX_NUMBER - ConstantNumbers.MIN_NUMBER + 1 },
		(_, i) => i + ConstantNumbers.MIN_NUMBER
	);
};
class Lotto {
	price = ConstantNumbers.LOTTO_PRICE;
	lottoNumbers = createLottoNumbersArray();

	purchase(purchaseAmount) {
		// 구매 금액을 로또 가격으로 나눈 몫이 quantity
		return purchaseAmount / this.price;
	}

	createLottoNumbers() {
		return [...this.lottoNumbers].sort(() => Math.random() - 0.5).slice(0, 6);
	}

	generatePurchasedLottoNumbers(purchaseAmount) {
		const quantity = this.purchase(purchaseAmount);
		const lottoNumbers = [];

		for (let i = 0; i < quantity; i++) {
			lottoNumbers.push(this.createLottoNumbers());
		}

		return lottoNumbers;
	}
}

export default Lotto;
