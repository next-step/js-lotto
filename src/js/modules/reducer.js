import {
  GET_PRICE,
  SET_PRICE,
  SHOW_NUMBERS,
  GET_NUMBERS,
  SET_WINNING_NUMBERS,
  SET_BONUS_NUMBER,
} from "./actions.js";

const initialState = {
  price: 0,
  numbers: [],
  winningNumbers: [],
  isShow: false,
  bonusNumber: 0,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PRICE:
      return {
        ...state,
        price: payload.price,
      };

    case SET_WINNING_NUMBERS:
      return {
        ...state,
        winningNumbers: payload.winningNumbers,
      };

    case SHOW_NUMBERS:
      return {
        ...state,
        isShow: payload.isShow,
      };

    case SET_BONUS_NUMBER:
      return {
        ...state,
        bonusNumber: payload.bonusNumber,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
