import { SET_INPUT_MONEY, SET_PURCHASED_LOTTO_COUNT, RESET_ALL } from '../action/lotto-actions.js';

export const INITIAL_LOTTO_STATE = {
	inputMoney: 0,
	purchasedLottoCnt: 0,
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
		case SET_PURCHASED_LOTTO_COUNT:
			return {
				...state,
				purchasedLottoCnt: action.payload,
			};
		case RESET_ALL:
			return INITIAL_LOTTO_STATE;
		default:
			console.error(`잘못된 action type : ${action.type}`);
			return state;
	}
};
