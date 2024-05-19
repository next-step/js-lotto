import { ConstantNumbers } from './constant';

export const ErrorMessages = {
	INVALID_WINNING_NUMBER: '[ERROR] 당첨 번호는 1 ~ 45 사이의 숫자여야 합니다',
	INVALID_WINNING_NUMBER_LENGTH: '[ERROR] 당첨 번호는 6개의 숫자여야 합니다',
	DUPLICATED_WINNING_NUMBERS: '[ERROR] 당첨 번호는 중복될 수 없습니다.',
	INVALID_BONUS_NUMBER: '[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다',
	INVALID_BONUS_NUMBER_RANGE: '[ERROR] 보너스 번호는 1 ~ 45 사이의 숫자여야 합니다'
};

export const validateWinningNumbers = (winningNumbers, bonusNumber) => {
	const isValidNumbers = winningNumbers.every(
		number => number >= ConstantNumbers.MIN_NUMBER && number <= ConstantNumbers.MAX_NUMBER
	);

	if (!isValidNumbers) {
		throw new Error(ErrorMessages.INVALID_WINNING_NUMBER);
	}

	if (winningNumbers.length != 6) {
		throw new Error(ErrorMessages.INVALID_WINNING_NUMBER_LENGTH);
	}

	if (new Set(winningNumbers).size != 6) {
		throw new Error(ErrorMessages.DUPLICATED_WINNING_NUMBERS);
	}

	if (winningNumbers.includes(bonusNumber)) {
		throw new Error(ErrorMessages.INVALID_BONUS_NUMBER);
	}

	if (bonusNumber < ConstantNumbers.MIN_NUMBER || bonusNumber > ConstantNumbers.MAX_NUMBER) {
		throw new Error(ErrorMessages.INVALID_BONUS_NUMBER_RANGE);
	}
};
