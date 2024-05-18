import { ConstantNumbers } from './constant';

const createLottoNumbersArray = () => {
	return Array.from(
		{ length: ConstantNumbers.MAX_NUMBER - ConstantNumbers.MIN_NUMBER + 1 },
		(_, i) => i + ConstantNumbers.MIN_NUMBER
	);
};
class Lotto {
	price = ConstantNumbers.LOTTO_PRICE;
	static lottoNumbers = createLottoNumbersArray();

	purchase(purchaseAmount) {
		// 구매 금액을 로또 가격으로 나눈 몫이 quantity
		return purchaseAmount / this.price;
	}

	createLottoNumbers() {
		return [...Lotto.lottoNumbers].sort(() => Math.random() - 0.5).slice(0, 6);
	}
}

export default Lotto;
