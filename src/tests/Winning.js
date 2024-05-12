import Lotto from './Lotto';
import { WinningRank, WinningPrize } from './constant';

class Winning {
	lotto = new Lotto();

	constructor(userInputWinningNumber) {
		this.winningNumbers = userInputWinningNumber;
		this.createLottoNumbers = this.lotto.createLottoNumbers();
		this.createBonusNumber = this.lotto.createBonusNumber();
	}

	checkWinning(winningNumbers, createLottoNumbers, createBonusNumber) {
		const matches = winningNumbers.filter(number => createLottoNumbers.includes(number)).length;
		const bonusMatches = winningNumbers.includes(createBonusNumber);

		if (matches === 6) return WinningRank.FIRST_PLACE;
		if (matches === 5 && bonusMatches) return WinningRank.SECOND_PLACE;
		if (matches === 5) return WinningRank.THIRD_PLACE;
		if (matches === 4) return WinningRank.FOURTH_PLACE;
		if (matches === 3) return WinningRank.FIFTH_PLACE;
		return 0;
	}

	calculatePrize(winningNumbers, createLottoNumbers, createBonusNumber) {
		const matches = winningNumbers.filter(number => createLottoNumbers.includes(number)).length;
		const bonusMatches = winningNumbers.includes(createBonusNumber);

		switch (matches) {
			case 3:
				return WinningPrize.FIFTH_PRIZE;
			case 4:
				return WinningPrize.FOURTH_PRIZE;
			case 5:
				return bonusMatches ? WinningPrize.SECOND_PRIZE : WinningPrize.THIRD_PRIZE;
			case 6:
				return WinningPrize.FIRST_PRIZE;
		}
	}
}

export default Winning;
