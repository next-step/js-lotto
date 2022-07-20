import { MAX_COUNT_PER_LOTTO, MAX_RANDOM_NUMBER, PRICE_PER_LOTTO } from '../constants/index.js';

const changeAmountToCount = (amount) => amount / PRICE_PER_LOTTO;

const generateRandomNumber = () => Math.floor(Math.random() * MAX_RANDOM_NUMBER + 1);

const generateLottoItem = (set) => {
	if ([...set].length === MAX_COUNT_PER_LOTTO) {
		return [...set];
	}
	const randomNumber = generateRandomNumber();
	set.add(randomNumber);
	return generateLottoItem(set);
};

const generateLotto = (count) =>
	Array.from({ length: count }).map(() => {
		const lotto = new Set();
		return generateLottoItem(lotto);
	});

const getWinningNumberIndex = (name) => {
	return name.split('-').at(-1) - 1;
};

export { generateLotto, changeAmountToCount, getWinningNumberIndex, generateRandomNumber };
