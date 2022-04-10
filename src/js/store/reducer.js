import {
  SET_PRICE,
  SET_PURCHASED_LOTTO_NUMBERS,
  SET_PURCHASED_LOTTO_BONUS_NUMBER,
  SET_WIN_LOTTO_NUMBER,
  RESTART,
} from './actions.js';

const initialState = {
  price: 0,
  purchasedLottoNumbers: [],
  bonusNumber: 0,
  winLottoNumber: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PRICE:
      return {
        ...state,
        price: payload.price,
      };

    case SET_PURCHASED_LOTTO_NUMBERS:
      return {
        ...state,
        purchasedLottoNumbers: payload.purchasedLottoNumbers,
      };

    case SET_PURCHASED_LOTTO_BONUS_NUMBER:
      return {
        ...state,
        bonusNumber: payload.bonusNumber,
      };

    case SET_WIN_LOTTO_NUMBER:
      return {
        ...state,
        winLottoNumber: payload.winLottoNumber,
      };

    case RESTART:
      return { ...initialState };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
