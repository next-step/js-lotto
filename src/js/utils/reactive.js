import debounce from './debounce.js';
import { reactiveRender } from './reactiveRender.js';

const tick = debounce();

function observser() {
  tick({ duration: 0, callback: reactiveRender });
}

export default function reactive(payload) {
  const state = { ...payload };
  const proxyState = {};
  Object.keys(state).forEach(key => {
    let current = state[key];
    Object.defineProperty(state, key, {
      get() {
        return current;
      },
      set(newValue) {
        if (current === newValue) return;
        current = newValue;
        observser();
      },
    });
    Object.defineProperty(proxyState, key, {
      get() {
        return current;
      },
      set() {
        throw new Error('외부에서 state조작은 불가능 합니다.');
      },
    });
  });

  return { state, proxyState };
}
