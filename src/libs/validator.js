import {
	DUPLICATE_NUMBER_MESSAGE,
	NOT_TEN_UNIT_PRICE_MESSAGE,
	UNDER_MIN_NUMBER_MESSAGE,
	OVER_MAX_NUMBER_MESSAGE,
	PRICE_PER_LOTTO,
} from '../constants/index.js';
import { MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../constants/magicNumber.js';
import { isNotUndefined } from './fp.js';

const isPurchaseAmountValidator = (number) => {
	if (!number) {
		return {
			valid: false,
			msg: '금액을 입력해주세요',
		};
	}

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
		if (lottoResult.includes(parseInt(lottoNumber, 10)))
			return { valid: false, msg: DUPLICATE_NUMBER_MESSAGE };
		return { valid: true };
	};

const winningNumberValidator = (winningNumbers) => {
	if (winningNumbers.filter(isNotUndefined).length < 7) {
		return {
			valid: false,
			msg: '모든 숫자를 채워야 합니다',
		};
	}
	return { valid: true };
};

export { isPurchaseAmountValidator, generateResultValidator, winningNumberValidator };
