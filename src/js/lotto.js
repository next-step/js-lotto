import { MAX_COUNT_PER_LOTTO, MAX_RANDOM_NUMBER } from '../constants/index.js';

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

export { generateLotto };
