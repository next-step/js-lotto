import {
	DUPLICATE_MESSAGE,
	NOT_TEN_UNIT_PRICE_MESSAGE,
	OVER_ZERO_MESSAGE,
	UNDER_45_MESSAGE,
} from '../constants/index.js';

const isPositiveIntegerAmountValidator = (number) => {
	if (number % 2 !== 0) {
		return {
			valid: false,
			msg: NOT_TEN_UNIT_PRICE_MESSAGE,
		};
	}

	return { valid: true };
};

const generateResultValidator =
	(array = []) =>
	(number) => {
		if (number < 1) return { valid: false, msg: OVER_ZERO_MESSAGE };
		if (number > 45) return { valid: false, msg: UNDER_45_MESSAGE };
		if (array.includes(number)) return { valid: false, msg: DUPLICATE_MESSAGE };
		return { valid: true };
	};

export { isPositiveIntegerAmountValidator, generateResultValidator };
