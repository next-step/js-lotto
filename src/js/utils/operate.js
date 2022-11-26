import { LOTTO } from "../constants/lotto.js";

const makeRandomNumber = () =>
	Math.floor(Math.random() * LOTTO.MAX_NUMBER) + LOTTO.MIN_NUMBER;

export const createRandomNumbers = () => {
	let randomNumbers = [];

	while (true) {
		if (randomNumbers.length === LOTTO.TOTAL_NUMBER_COUNT) return randomNumbers;
		const randomNumber = makeRandomNumber();

		if (randomNumbers.includes(randomNumber)) continue;
		randomNumbers.push(randomNumber);
	}
};
