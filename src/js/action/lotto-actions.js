export const SET_INPUT_MONEY = 'lotto/SET_INPUT_MONEY';
export const SET_LOTTO_LIST = 'lotto/SET_LOTTO_LIST';
export const RESET_ALL = 'lotto/RESET_ALL';

export const setInputMoney = (payload) => ({ type: SET_INPUT_MONEY, payload });
export const setLottoList = (payload) => ({
	type: SET_LOTTO_LIST,
	payload,
});
export const resetAll = () => ({
	type: RESET_ALL,
});
