import { LOTTO_PRICE } from './constant';

class Lotto {
	price = LOTTO_PRICE;
	qty;

	constructor(qty) {
		this.qty = qty;
	}

	get totalPrice() {
		return this.qty * this.price;
	}
}

export default Lotto;
