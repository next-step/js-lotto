import Winning from '../src/tests/Winning';
import { WinningRank, WinningPrize } from '../src/tests/constant';

describe('로또 당첨 테스트', () => {
	test('사용자가 구매한 로또 번호와 당첨 번호를 비교한다', () => {
		// given
		const userInputWinningNumber = [1, 2, 3, 4, 5, 6];
		const userInputBonusNumber = 7;

		const lottoNumbers = [3, 4, 5, 6, 7, 8];

		// when
		const winning = new Winning(lottoNumbers, userInputWinningNumber, userInputBonusNumber);
		const { matches } = winning.calculateMatches();

		// then
		expect(matches).toBe(4);
	});
});

describe('당첨은 1등부터 5등까지 있다', () => {
	test.each([
		{ lottoNumbers: [1, 2, 3, 4, 5, 6], userInputWinningNumber: [1, 2, 3, 4, 5, 6], userInputBonusNumber: 7, expectedPlace: WinningRank.FIRST_PLACE },
		{ lottoNumbers: [1, 2, 3, 4, 5, 6], userInputWinningNumber: [1, 2, 3, 4, 5, 7], userInputBonusNumber: 7, expectedPlace: WinningRank.SECOND_PLACE },
		{ lottoNumbers: [1, 2, 3, 4, 5, 6], userInputWinningNumber: [1, 2, 3, 4, 5, 8], userInputBonusNumber: 7, expectedPlace: WinningRank.THIRD_PLACE },
		{ lottoNumbers: [1, 2, 3, 4, 5, 6], userInputWinningNumber: [1, 2, 3, 4, 8, 9], userInputBonusNumber: 7, expectedPlace: WinningRank.FOURTH_PLACE },
		{ lottoNumbers: [1, 2, 3, 4, 5, 6], userInputWinningNumber: [1, 2, 3, 8, 9, 10], userInputBonusNumber: 7, expectedPlace: WinningRank.FIFTH_PLACE }
	])('Lotto: %o, User winning: %o, User bonus: %i', ({ lottoNumbers, userInputWinningNumber, userInputBonusNumber, expectedPlace }) => {
		const winning = new Winning(lottoNumbers, userInputWinningNumber, userInputBonusNumber);

		// when
		const place = winning.checkWinning();

		// then
		expect(place).toBe(expectedPlace);
	});
});

describe('당첨 기준에 대한 금액 일치', () => {
	test.each([
		{ lottoNumbers: [1, 2, 3, 4, 5, 6], userInputWinningNumber: [1, 2, 3, 4, 5, 6], userInputBonusNumber: 7, expectedPrized: WinningPrize.FIRST_PRIZE },
		{ lottoNumbers: [1, 2, 3, 4, 5, 6], userInputWinningNumber: [1, 2, 3, 4, 5, 7], userInputBonusNumber: 7, expectedPrized: WinningPrize.SECOND_PRIZE },
		{ lottoNumbers: [1, 2, 3, 4, 5, 6], userInputWinningNumber: [1, 2, 3, 4, 5, 8], userInputBonusNumber: 7, expectedPrized: WinningPrize.THIRD_PRIZE },
		{ lottoNumbers: [1, 2, 3, 4, 5, 6], userInputWinningNumber: [1, 2, 3, 4, 8, 9], userInputBonusNumber: 7, expectedPrized: WinningPrize.FOURTH_PRIZE },
		{ lottoNumbers: [1, 2, 3, 4, 5, 6], userInputWinningNumber: [1, 2, 3, 8, 9, 10], userInputBonusNumber: 7, expectedPrized: WinningPrize.FIFTH_PRIZE }
	])('Lotto: %o, User winning: %o, User bonus: %i', ({ lottoNumbers, userInputWinningNumber, userInputBonusNumber, expectedPrized }) => {
		// given
		const winning = new Winning(lottoNumbers, userInputWinningNumber, userInputBonusNumber);

		// when
		const prize = winning.calculatePrize();

		// then
		expect(prize).toBe(expectedPrized);
	});
});
