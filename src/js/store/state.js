import { INITIAL_STATE } from '../utils/constant.js';

// let state = {};

// export const setState = newState => {
//   state = { ...state, ...newState };
//   console.log(state);
// };

// export const getState = () => {
//   return state;
// };

// setState(INITIAL_STATE);

export const store = (() => {
  let state = {};
  return {
    setState: newState => {
      state = { ...state, ...newState };
    },
    getState: () => state,
  };
})();

store.setState(INITIAL_STATE);
