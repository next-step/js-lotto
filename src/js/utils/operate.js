import { LOTTO } from "../constants/lotto.js";

export const createRandomNumbers = () => {
	let randomNumbers = [];
	for (let i = 0; i < 6; i++) {
		randomNumbers.push(
			Math.floor(Math.random() * LOTTO.MAX_NUMBER) + LOTTO.MIN_NUMBER
		);
	}
	// 중복체크 로직
	return randomNumbers;
};
