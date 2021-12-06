import { CONSTANT } from './constants.js';

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
		result.push(randomNumbers())
	}
	
	return result
} 

