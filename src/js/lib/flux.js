export const createStore = reducer => {
  let state;
  const listeners = [];

  const getState = _ => ({ ...state });

  const dispatch = action => {
    state = reducer(action, state);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => {
    listeners.push(listener);

    return _ => listeners.splice(listeners.indexOf(listener), 1);
  };

  return { getState, dispatch, subscribe };
};
