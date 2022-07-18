import {
	DUPLICATE_NUMBER_MESSAGE,
	NOT_TEN_UNIT_PRICE_MESSAGE,
	UNDER_MIN_NUMBER_MESSAGE,
	OVER_MAX_NUMBER_MESSAGE,
	PRICE_PER_LOTTO,
	INPUT_AMOUNT_MESSAGE,
	NOT_EMPTY_WINNING_NUMBERS_MESSAGE,
	MAX_LOTTO_NUMBER,
	MIN_LOTTO_NUMBER,
	MAX_WINNING_NUMBERS_LENGTH,
} from '../constants/index.js';

import { isTruthy } from './fp.js';

const isPurchaseAmountValidator = (amount) => {
	if (!amount) {
		return {
			valid: false,
			msg: INPUT_AMOUNT_MESSAGE,
		};
	}

	if (amount % PRICE_PER_LOTTO !== 0) {
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

const winningNumberValidator = (winningNumbers) => {
	if (winningNumbers.filter(isTruthy).length < MAX_WINNING_NUMBERS_LENGTH) {
		return {
			valid: false,
			msg: NOT_EMPTY_WINNING_NUMBERS_MESSAGE,
		};
	}
	return { valid: true };
};

export { isPurchaseAmountValidator, generateResultValidator, winningNumberValidator };
