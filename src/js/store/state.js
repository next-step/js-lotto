import { INITIAL_STATE } from '../utils/constant.js';

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
