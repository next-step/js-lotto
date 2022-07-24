export const SET_INPUT_MONEY = 'lotto/SET_INPUT_MONEY';
export const SET_LOTTO_LIST = 'lotto/SET_LOTTO_LIST';
export const SET_LOTTO_ANSWER_LIST = 'lotto/SET_LOTTO_ANSWER_LIST';
export const SET_PROFIT_RATE = 'lotto/SET_PROFIT_RATE';
export const SET_LOTTO_ANSWER_COUNT_LIST = 'lotto/SET_LOTTO_ANSWER_COUNT_LIST';
export const RESET_ALL = 'lotto/RESET_ALL';

export const setInputMoney = (payload) => ({ type: SET_INPUT_MONEY, payload });
export const setLottoList = (payload) => ({
	type: SET_LOTTO_LIST,
	payload,
});
export const resetAll = () => ({
	type: RESET_ALL,
});
export const setLottoAnswerList = (payload) => ({
	type: SET_LOTTO_ANSWER_LIST,
	payload,
});
export const setProfitRate = (payload) => ({
	type: SET_PROFIT_RATE,
	payload,
});
export const setLottoAnswerCountList = (payload) => ({
	type: SET_LOTTO_ANSWER_COUNT_LIST,
	payload,
});
