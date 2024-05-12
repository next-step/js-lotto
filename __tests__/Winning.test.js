import Winning from '../src/tests/Winning';

describe('로또 당첨 테스트', () => {
	test('사용자가 구매한 로또 번호와 당첨 번호를 비교한다', () => {
		// given
		const userInputWinningNumber = [1, 2, 3, 4, 5, 6];
		const userInputBonusNumber = 7;

		const lottoNumbers = [3, 4, 5, 6, 7, 8];

		// when
		const matches = userInputWinningNumber.filter(number => lottoNumbers.includes(number)).length;

		if (matches.length === 5 && lottoNumbers.includes(userInputBonusNumber)) {
			matches.length += 1;
		}

		// then
		expect(matches).toBe(4);
	});

	test('당첨은 1등부터 5등까지 있다', () => {
		// given
		const lotto = new Winning();

		// when
		// then
		expect(lotto.checkWinning([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], 7)).toBe(1);
		expect(lotto.checkWinning([1, 2, 3, 4, 5, 7], [1, 2, 3, 4, 5, 6], 7)).toBe(2);
		expect(lotto.checkWinning([1, 2, 3, 4, 5, 8], [1, 2, 3, 4, 5, 6], 7)).toBe(3);
		expect(lotto.checkWinning([1, 2, 3, 4, 8, 9], [1, 2, 3, 4, 5, 6], 7)).toBe(4);
		expect(lotto.checkWinning([1, 2, 3, 8, 9, 10], [1, 2, 3, 4, 5, 6], 7)).toBe(5);
	});
});
