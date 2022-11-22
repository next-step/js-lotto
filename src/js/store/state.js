let state = {};

export const setState = newState => {
  state = newState;
};

export const getState = () => {
  return state;
};
