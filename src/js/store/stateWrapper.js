const stateWrapper = (targetState, renderer) => {
  const handler = {
    get(...props) {
      return Reflect.get(...props);
    },
    set(...props) {
      const ret = Reflect.set(...props);
      renderer(Reflect.get(...props));
      return ret;
    },
  };

  return new Proxy(targetState, handler);
};

export default stateWrapper;
