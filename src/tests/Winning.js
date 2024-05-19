import Lotto from './Lotto';
import { WinningRank, WinningPrize, ConstantNumbers } from './constant';
import { ErrorMessages } from './error';

export const validateWinningNumbers = (winningNumbers, bonusNumber) => {
	const isValidNumbers = winningNumbers.every(
		number => number >= ConstantNumbers.MIN_NUMBER && number <= ConstantNumbers.MAX_NUMBER
	);

	if (!isValidNumbers) {
		throw new Error(ErrorMessages.INVALID_WINNING_NUMBER);
	}

	if (winningNumbers.length != 6) {
		throw new Error(ErrorMessages.INVALID_WINNING_NUMBER_LENGTH);
	}

	if (new Set(winningNumbers).size != 6) {
		throw new Error(ErrorMessages.DUPLICATED_WINNING_NUMBERS);
	}

	if (winningNumbers.includes(bonusNumber)) {
		throw new Error(ErrorMessages.INVALID_BONUS_NUMBER);
	}

	if (bonusNumber < ConstantNumbers.MIN_NUMBER || bonusNumber > ConstantNumbers.MAX_NUMBER) {
		throw new Error(ErrorMessages.INVALID_BONUS_NUMBER_RANGE);
	}
};

class Winning {
	constructor(lottoNumbers, userInputWinningNumber, userInputBonusNumber) {
		this.lotto = new Lotto();
		this.lottoNumbers = lottoNumbers;
		this.userInputWinningNumber = userInputWinningNumber;
		this.userInputBonusNumber = userInputBonusNumber;
		this.matches = 0;
		this.bonusMatches = false;
	}

	checkWinning() {
		const { matches, bonusMatches } = this.calculateMatches();

		switch (matches) {
			case 3:
				return WinningRank.FIFTH_PLACE;
			case 4:
				return WinningRank.FOURTH_PLACE;
			case 5:
				return bonusMatches ? WinningRank.SECOND_PLACE : WinningRank.THIRD_PLACE;
			case 6:
				return WinningRank.FIRST_PLACE;
			default:
				return 0;
		}
	}

	calculatePrize() {
		const { matches, bonusMatches } = this.calculateMatches();

		switch (matches) {
			case 3:
				return WinningPrize.FIFTH_PRIZE;
			case 4:
				return WinningPrize.FOURTH_PRIZE;
			case 5:
				return bonusMatches ? WinningPrize.SECOND_PRIZE : WinningPrize.THIRD_PRIZE;
			case 6:
				return WinningPrize.FIRST_PRIZE;
			default:
				return 0;
		}
	}

	calculateMatches() {
		this.matches = this.lottoNumbers.filter(number => this.userInputWinningNumber.includes(number)).length;
		this.bonusMatches = this.userInputWinningNumber.includes(this.userInputBonusNumber);
		return { matches: this.matches, bonusMatches: this.bonusMatches };
	}

	static calculateResults(lottoNumbers, userInputWinningNumber, userInputBonusNumber) {
		const prizeCounts = {
			[WinningRank.FIFTH_PLACE]: 0,
			[WinningRank.FOURTH_PLACE]: 0,
			[WinningRank.THIRD_PLACE]: 0,
			[WinningRank.SECOND_PLACE]: 0,
			[WinningRank.FIRST_PLACE]: 0
		};
		let totalPrize = 0;

		lottoNumbers.forEach(numbers => {
			const winning = new Winning(numbers, userInputWinningNumber, userInputBonusNumber);
			const prize = winning.calculatePrize();
			totalPrize += prize;

			if (prize === WinningPrize.FIFTH_PRIZE) prizeCounts[WinningRank.FIFTH_PLACE]++;
			if (prize === WinningPrize.FOURTH_PRIZE) prizeCounts[WinningRank.FOURTH_PLACE]++;
			if (prize === WinningPrize.THIRD_PRIZE) prizeCounts[WinningRank.THIRD_PLACE]++;
			if (prize === WinningPrize.SECOND_PRIZE) prizeCounts[WinningRank.SECOND_PLACE]++;
			if (prize === WinningPrize.FIRST_PRIZE) prizeCounts[WinningRank.FIRST_PLACE]++;
		});
		return { prizeCounts, totalPrize };
	}

	static calculateRate(totalPrize, purchaseAmount) {
		if (purchaseAmount === 0) {
			return 0;
		}
		return (totalPrize / purchaseAmount) * 100;
	}
}

export default Winning;
