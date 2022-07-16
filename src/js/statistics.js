import {
	FIRST_PLACE,
	SECOND_PLACE,
	THIRD_PLACE,
	FORTH_PLACE,
	FIFTH_PLACE,
} from '../constants/index.js';
import { isNil, includes } from '../libs/fp.js';

const splitWinningNumberAndBonus = (winningNumbers) => {
	return {
		winnings: winningNumbers.slice(0, 6),
		bonus: winningNumbers.slice(6, 7)[0],
	};
};

const getRankArrayPerLotto = (store) => {
	const { lottoNumbers, winningNumbers } = store;
	const { winnings, bonus } = splitWinningNumberAndBonus(winningNumbers);

	return lottoNumbers
		.map((lottoNumber) => {
			const filteredLottoNumber = lottoNumber.filter((number) => includes(winnings, number));
			if (filteredLottoNumber.length === 6) return 1;
			if (filteredLottoNumber.length === 5 && includes(lottoNumber, bonus)) return 2;
			if (filteredLottoNumber.length === 5 && !includes(lottoNumber, bonus)) return 3;
			if (filteredLottoNumber.length === 4) return 4;
			if (filteredLottoNumber.length === 3) return 5;
		})
		.filter(isNil);
};

const calculateWinningCountPerRank = (rankArray) => {
	const result = {};
	rankArray.forEach((number) => {
		if (Object.keys(result).includes(number)) {
			result[number] += 1;
		}
		result[number] = 1;
	});
	return result;
};

const calculateTotalWinning = (rankArray) => {
	const winningTable = {
		1: FIRST_PLACE,
		2: SECOND_PLACE,
		3: THIRD_PLACE,
		4: FORTH_PLACE,
		5: FIFTH_PLACE,
	};

	return rankArray.reduce((winningCount, rank) => winningCount + winningTable[rank], 0);
};

const calculateTotalProfit = (purchaseAmount, totalWinnings) =>
	((totalWinnings - purchaseAmount) / purchaseAmount) * 100;

export {
	getRankArrayPerLotto,
	calculateWinningCountPerRank,
	calculateTotalWinning,
	calculateTotalProfit,
};
