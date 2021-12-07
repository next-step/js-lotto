export const createStore = (initialState) => {
  return {
    state: Object.keys(initialState).reduce((stateCollection, stateKey) => {
      return {
        ...stateCollection,
        [stateKey]: { value: initialState[stateKey], effects: [] },
      };
    }, {}),

    setState(stateKey, value) {
      if (!(stateKey in this.state)) {
        throw Error(`존재하지 않는 state입니다. (stateKey: ${stateKey})`);
      }

      this.state[stateKey] = {
        ...this.state[stateKey],
        value,
      };

      this.state[stateKey].effects.forEach((effect) => effect(value));
    },

    selectState(stateKey) {
      if (!stateKey) {
        return Object.keys(this.state).reduce((acc, key) => {
          return {
            ...acc,
            [key]: this.state[key].value,
          };
        }, {});
      }

      if (!(stateKey in this.state)) {
        throw Error(`존재하지 않는 state입니다. (stateKey: ${stateKey})`);
      }

      return this.state[stateKey].value;
    },

    subscribeState(stateKey, effect) {
      if (typeof effect !== "function") {
        throw Error("store의 state 구독시 effect는 함수만 허용됩니다.");
      }

      const _subscribeState = (stateKey, effect) => {
        if (!(stateKey in this.state)) {
          throw Error(`존재하지 않는 state입니다. (stateKey: ${stateKey})`);
        }

        this.state[stateKey].effects.push(effect);
      };

      if (Array.isArray(stateKey)) {
        stateKey.forEach((key) => _subscribeState(key, effect));
      } else {
        _subscribeState(stateKey, effect);
      }
    },
  };
};
