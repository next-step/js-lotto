const stateManager = (targetState, subscribeMap) => {
  const handler = {
    get(...props) {
      return Reflect.get(...props);
    },
    set(target, key, ...rest) {
      const ret = Reflect.set(target, key, ...rest);

      subscribeMap
        .get(key)
        ?.forEach((subscribe) =>
          subscribe.render(Reflect.get(target, key, ...rest))
        );

      return ret;
    },
  };

  return new Proxy(targetState, handler);
};

const createStore = (initialState) => {
  const subscribeMap = new Map();
  Object.keys(initialState).forEach((key) => subscribeMap.set(key, []));

  const state = stateManager(initialState, subscribeMap);

  const subscribe = (key, handle) => {
    const values = subscribeMap.get(key);
    subscribeMap.set(key, values.concat(handle));
  };

  return {
    subscribe,
    state,
  };
};

export default createStore;
