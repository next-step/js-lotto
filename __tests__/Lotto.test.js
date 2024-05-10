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
});
