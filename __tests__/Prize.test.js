import Lotto from '../src/tests/Lotto';
import Winning from '../src/tests/Winning';

describe('상금 테스트', () => {
	test('수익률은 (당첨금액 / 구매금액 * 100) 이다', () => {
		// given
		const purchaseAmount = 5000;
		const userInputWinningNumber = [1, 2, 3, 4, 5, 6];
		const mockLottoNumbers = [1, 2, 3, 7, 8, 9];
		const mockBonusNumber = 10;

		const lotto = new Lotto();
		lotto.purchase(purchaseAmount);
		lotto.lottoNumbers = [...Array(45).keys()].map(x => x + 1);

		lotto.createLottoNumbers = jest.fn().mockReturnValue(mockLottoNumbers);
		lotto.createBonusNumber = jest.fn().mockReturnValue(mockBonusNumber);

		const winning = new Winning(userInputWinningNumber);
		winning.lotto = lotto;

		// when
		const prize = winning.calculatePrize();
		const rate = winning.calculateRate();

		// then
		expect(rate).toBe((prize / purchaseAmount) * 100);
	});
});
