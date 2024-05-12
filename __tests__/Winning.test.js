import Winning from '../src/tests/Winning';
import { WinningRank, WinningPrize } from '../src/tests/constant';

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
		const firstPlace = new Winning([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], 7);
		const secondPlace = new Winning([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 7], 7);
		const thirdPlace = new Winning([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 8], 7);
		const fourthPlace = new Winning([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 8, 9], 7);
		const fifthPlace = new Winning([1, 2, 3, 4, 5, 6], [1, 2, 3, 8, 9, 10], 7);

		// when
		// then
		expect(firstPlace.checkWinning()).toBe(WinningRank.FIRST_PLACE);
		expect(secondPlace.checkWinning()).toBe(WinningRank.SECOND_PLACE);
		expect(thirdPlace.checkWinning()).toBe(WinningRank.THIRD_PLACE);
		expect(fourthPlace.checkWinning()).toBe(WinningRank.FOURTH_PLACE);
		expect(fifthPlace.checkWinning()).toBe(WinningRank.FIFTH_PLACE);
	});

	test('당첨 기준에 대한 금액 일치', () => {
		// given
		const firstPlace = new Winning([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], 7);
		const secondPlace = new Winning([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 7], 7);
		const thirdPlace = new Winning([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 8], 7);
		const fourthPlace = new Winning([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 8, 9], 7);
		const fifthPlace = new Winning([1, 2, 3, 4, 5, 6], [1, 2, 3, 8, 9, 10], 7);

		// when
		// then
		expect(firstPlace.calculatePrize()).toBe(WinningPrize.FIRST_PRIZE);
		expect(secondPlace.calculatePrize()).toBe(WinningPrize.SECOND_PRIZE);
		expect(thirdPlace.calculatePrize()).toBe(WinningPrize.THIRD_PRIZE);
		expect(fourthPlace.calculatePrize()).toBe(WinningPrize.FOURTH_PRIZE);
		expect(fifthPlace.calculatePrize()).toBe(WinningPrize.FIFTH_PRIZE);
	});
});
