export const isInputMoneyValid = function (inputMoney) {
	const LOTTO_PRICE = 1000;
	return !(inputMoney % LOTTO_PRICE);
};
