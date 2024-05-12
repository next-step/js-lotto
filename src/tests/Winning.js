import Lotto from './Lotto';

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

		if (matches === 6) return 1;
		if (matches === 5 && bonusMatches) return 2;
		if (matches === 5) return 3;
		if (matches === 4) return 4;
		if (matches === 3) return 5;
		return 0;
	}
}

export default Winning;
