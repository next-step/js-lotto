import Lotto from '../src/tests/Lotto';

describe('로또 기능 테스트', () => {
	test('로또 1장의 가격은 1000원이다', () => {
		// given
		const lotto = new Lotto();

		// when
		const price = lotto.price;

		// then
		expect(price).toBe(1000);
	});

	test('로또 구입 금액을 입력하면 구입 금액에 해당하는 만큼 로또를 발행해야 한다.', () => {
		// given
		const lotto = new Lotto();

		// when
		const qty = lotto.purchase(5000);

		// then
		expect(qty).toBe(5);
	});
});
