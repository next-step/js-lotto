import { LOTTO_PRICE } from './constant';

class Lotto {
	price = LOTTO_PRICE;
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
}

export default Lotto;
