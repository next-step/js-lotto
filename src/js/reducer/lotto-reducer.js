import { SET_INPUT_MONEY, SET_LOTTO_LIST, RESET_ALL } from '../action/lotto-actions.js';

export const INITIAL_LOTTO_STATE = {
	inputMoney: 0,
	lottoList: [],
};

export const lottoReducer = function (state = INITIAL_LOTTO_STATE, action) {
	if (!action.type) {
		console.error('state 변경을 위한 action 의 type이 지정되지 않았습니다.');
	}
	switch (action.type) {
		case SET_INPUT_MONEY:
			return {
				...state,
				inputMoney: action.payload,
			};
		case SET_LOTTO_LIST:
			return {
				...state,
				lottoList: action.payload,
			};
		case RESET_ALL:
			return INITIAL_LOTTO_STATE;
		default:
			console.error(`잘못된 action type : ${action.type}`);
			return state;
	}
};
