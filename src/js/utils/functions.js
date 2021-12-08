import { CONSTANT, LOTTO_WINNINGS } from "./constants.js";

export const calculatePayment = (money) => {
	if (money < CONSTANT.LOTTO_PRICE) return alert("1,000원 이상 입력해주세요");
	const countLotto = Math.floor(money / CONSTANT.LOTTO_PRICE);
	const charge = money % CONSTANT.LOTTO_PRICE;
	if (charge !== 0) alert(`거스름돈은 ${charge}원 입니다.`);

	return countLotto;
};

const rand = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomNumbers = () => {
	let numberSet = new Set();
	while (numberSet.size < CONSTANT.WINNING_NUMBERS_LENGTH) {
		numberSet.add(rand(CONSTANT.MIN_NUMBER, CONSTANT.MAX_NUMBER));
	}

	return [...numberSet].sort((a, b) => a - b);
};

export const makeLottoNumbers = (count) => {
	const result = [];
	for (let i = 0; i < count; i++) {
		result.push(randomNumbers());
	}

	return result;
};

export const countLottoRank = (
	input2DArray,
	winningArray,
	result = JSON.parse(JSON.stringify(LOTTO_WINNINGS))
) => {
	console.log(result);
	const winningNumbersArray = winningArray.slice(0, -1);
	const bonusNumber = winningArray.slice(-1)[0];
	input2DArray.forEach((inputArray) => {
		const matchCount = inputArray.filter((val) =>
			winningNumbersArray.includes(val)
		).length;
		const bonusMatchCount = inputArray.includes(bonusNumber) ? 1 : 0;
		const resultFindIndex = result.findIndex(
			(val) =>
				val.matchCount === matchCount && val.bonusMatchCount === bonusMatchCount
		);
		if (resultFindIndex !== -1) {
			result[resultFindIndex].count++;
		}
	});

	return result;
};

export const calculateProfitRate = (rank, count) => {
	const sum = rank.reduce((acc, val) => acc + val.count * val.prize, 0);

	return Math.floor((sum / (count * CONSTANT.LOTTO_PRICE)) * 100) - 100;
};
