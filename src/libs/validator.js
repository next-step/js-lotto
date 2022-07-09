const isPositiveIntegerAmountValidator = (number) => {
	if (number % 2 !== 0) {
		return {
			valid: false,
			msg: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
		};
	}

	return { valid: true };
};

const generateResultValidator =
	(array = []) =>
	(number) => {
		if (number < 1) return { valid: false, msg: '0보다 커야합니다' };
		if (number > 45) return { valid: false, msg: '45보다 작아야 합니다' };
		if (array.includes(number)) return { valid: false, msg: '중복된 숫지' };
		return { valid: true };
	};

export { isPositiveIntegerAmountValidator, generateResultValidator };
