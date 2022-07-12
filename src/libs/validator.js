import {
	DUPLICATE_NUMBER_MESSAGE,
	NOT_TEN_UNIT_PRICE_MESSAGE,
	UNDER_MIN_NUMBER_MESSAGE,
	OVER_MAX_NUMBER_MESSAGE,
	PRICE_PER_LOTTO,
} from '../constants/index.js';
import { MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../constants/magicNumber.js';

const isPositiveIntegerAmountValidator = (number) => {
	if (number % PRICE_PER_LOTTO !== 0) {
		return {
			valid: false,
			msg: NOT_TEN_UNIT_PRICE_MESSAGE,
		};
	}

	return { valid: true };
};

const generateResultValidator =
	(lottoResult = []) =>
	(lottoNumber) => {
		if (lottoNumber < MIN_LOTTO_NUMBER) return { valid: false, msg: UNDER_MIN_NUMBER_MESSAGE };
		if (lottoNumber > MAX_LOTTO_NUMBER) return { valid: false, msg: OVER_MAX_NUMBER_MESSAGE };
		if (lottoResult.includes(lottoNumber)) return { valid: false, msg: DUPLICATE_NUMBER_MESSAGE };
		return { valid: true };
	};

export { isPositiveIntegerAmountValidator, generateResultValidator };
