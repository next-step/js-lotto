import { SET_PRICE, TOGGLE_IS_SHOW_NUMBER } from './actions.js';

const initialState = {
  price: 0,
  lottoNumbers: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PRICE:
      return {
        ...state,
        price: payload.price,
      };

    case TOGGLE_IS_SHOW_NUMBER:
      return {
        ...state,
        isShow: payload.isShow,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
