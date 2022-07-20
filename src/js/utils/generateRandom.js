import {LOTTO_MAX_VALUE, LOTTO_MIN_VALUE, LOTTO_RESULT_AMOUNT} from "../const/const.js"

export const generateRandom = () => {
	const lottoNums = []
	for (let i = 0; i < LOTTO_RESULT_AMOUNT; i++) {
		lottoNums.push(Math.floor(Math.random() * (LOTTO_MAX_VALUE - LOTTO_MIN_VALUE + 1)) + LOTTO_MIN_VALUE);
	}
	return lottoNums;
}