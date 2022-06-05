let _initialState = {
  reset: false,
};

const executeSubscribeWhenUpdatedState = (targetState, subscribeMap) => {
  const handler = {
    get(...props) {
      return Reflect.get(...props);
    },
    set(target, key, value, receiver) {
      if (key !== 'reset') {
        Reflect.set(target, 'reset', false, receiver);
        Reflect.set(target, key, value, receiver);
      }

      if (key === 'reset' && value) {
        Reflect.set(
          target,
          key,
          {
            ..._initialState,
            reset: value,
          },
          receiver,
        );
      }

      subscribeMap
        .get(key)
        .forEach(subscribe =>
          subscribe?.render(Reflect.get(target, key), Reflect.get(target, 'reset')),
        );

      return true;
    },
  };

  return new Proxy(targetState, handler);
};

const createStore = initialState => {
  _initialState = { ...initialState };

  const subscribeMap = new Map();
  Object.keys(initialState).forEach(key => subscribeMap.set(key, []));

  const subscribe = ({ key, handles }) => {
    const registeredHandles = subscribeMap.get(key);
    subscribeMap.set(key, registeredHandles.concat(handles));
  };

  const state = executeSubscribeWhenUpdatedState(initialState, subscribeMap);

  return {
    subscribe,
    state,
  };
};

export default createStore;
