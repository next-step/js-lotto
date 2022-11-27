const lottoState = {
  list: [],
  observers: [],
};

export default function lottoStateService() {
  return new Proxy(lottoState, {
    set(target, prop, value) {
      const isValidKey = Object.keys(lottoState).includes(String(prop));

      if (!isValidKey) {
        return false;
      }

      Reflect.set(target, prop, value);

      if ('list' === prop) {
        target.observers.forEach(fn => fn(Reflect.get(target, 'list')));
      }

      return true;
    },
  });
}
