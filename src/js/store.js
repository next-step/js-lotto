const store = (initState) => {
  const state = {};

  for (let key in initState) {
    state[key] = {
      value: initState[key],
      subscribe: [],
    };
  }

  const getState = (key) => {
    return state[key].value;
  };

  const setState = (newState) => {
    for (let key in newState) {
      if (state[key]?.value !== newState[key]) {
        state[key].value = newState[key];
        state[key].subscribe.forEach((fn) => fn(getState, setState));
      }
    }
  };

  const useEffect = (cb, keys) => {
    for (let key of keys) {
      state[key].subscribe.push(cb);
    }
  };

  return {
    getState,
    setState,
    useEffect,
  };
};

export default store;
