import { SET_PRICE } from './actions.js';

const initialState = {
  price: 0,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PRICE:
      return {
        ...state,
        price: payload.price,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
