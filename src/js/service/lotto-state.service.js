const lottoState = {
  list: [],
  winningNumber: {
    numbers: [],
    bonus: null,
  },
  observers: [],
  reset: [],
};

export default function lottoStateService() {
  return new Proxy(lottoState, {
    set(target, prop, value) {
      const isValidKey = Object.keys(lottoState).includes(String(prop));
      if (!isValidKey) {
        return false;
      }

      Reflect.set(target, prop, value);

      if ('list' === prop && value) {
        target.observers.forEach(fn => fn(Reflect.get(target, 'list')));
      }

      if ('list' === prop && !value) {
        target.reset.forEach(fn => fn());
      }

      return true;
    },
  });
}
