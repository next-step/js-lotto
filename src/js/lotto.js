import { MAX_COUNT_PER_LOTTO, MAX_RANDOM_NUMBER } from '../constants';

const randomNumberGenerator = () => Math.floor(Math.random() * MAX_RANDOM_NUMBER + 1);

const lottoGenerator = (set) => {
	if ([...set].length === MAX_COUNT_PER_LOTTO) {
		return [...set];
	}
	const randomNumber = randomNumberGenerator();
	set.add(randomNumber);
	return lottoGenerator(set);
};

const lottosGenerator = (count) =>
	Array.from({ length: count }).map(() => {
		const lotto = new Set();
		return lottoGenerator(lotto);
	});

export { lottosGenerator };
