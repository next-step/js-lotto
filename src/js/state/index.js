const executeSubscribeWhenUpdatedState = (targetState, subscribeMap) => {
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

  const subscribe = (key, handle) => {
    const handles = subscribeMap.get(key);
    subscribeMap.set(key, handles.concat(handle));
  };

  const state = executeSubscribeWhenUpdatedState(initialState, subscribeMap);

  return {
    subscribe,
    state,
  };
};

export default createStore;
