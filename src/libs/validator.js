const isPositiveIntegerAmountValidator = (number) => {
	if (number % 2 !== 0) {
		return {
			valid: false,
			msg: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
		};
	}

	return { valid: true };
};

export { isPositiveIntegerAmountValidator };
