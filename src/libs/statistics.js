import {
	FIRST_PLACE,
	SECOND_PLACE,
	THIRD_PLACE,
	FORTH_PLACE,
	FIFTH_PLACE,
} from '../constants/index.js';

// 3, 4, 5, 5+1, 6

const includes = (arr, number) => arr.includes(number);

const isTruthy = (e) => !!e;

const sliceWinningNumberAndBonus = (winningNumbers) => {
	return {
		winnings: winningNumbers.slice(0, 6),
		bonus: winningNumbers.slice(6, 7)[0],
	};
};

const getWinningsResult = (store) => {
	const { lottoNumbers, winningNumbers } = store;
	const { winnings, bonus } = sliceWinningNumberAndBonus(winningNumbers);

	const resultArray = lottoNumbers
		.map((lottoNumber) => {
			const filteredLottoNumber = lottoNumber.filter((number) => {
				return includes(winnings, number);
			});
			if (filteredLottoNumber.length === 6) return 1;
			if (filteredLottoNumber.length === 5 && includes(lottoNumber, bonus)) return 2;
			if (filteredLottoNumber.length === 4) return 3;
			if (filteredLottoNumber.length === 3) return 4;
		})
		.filter(isTruthy);
	return resultArray;
};

const calculateWinningsPerRank = (resultArray) => {
	const result = {};
	resultArray.forEach((number) => {
		if (Object.keys(result).includes(number)) {
			result[number] += 1;
		}
		result[number] = 1;
	});
	return result;
};

const calculateTotalWinnings = (resultArray) => {
	const winningTable = {
		1: FIRST_PLACE,
		2: SECOND_PLACE,
		3: THIRD_PLACE,
		4: FIFTH_PLACE,
	};
	return resultArray.reduce((acc, cur) => acc + winningTable[cur], 0);
};

const calculateTotalReturn = (purchaseAmount, totalWinnings) =>
	(totalWinnings - purchaseAmount) / purchaseAmount;
export {
	getWinningsResult,
	calculateWinningsPerRank,
	calculateTotalWinnings,
	calculateTotalReturn,
};

// 계산식
