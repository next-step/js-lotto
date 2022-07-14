import throttle from './throttle.js';
import { reactiveRender } from './reactiveRender.js';

const tick = throttle();

function observser() {
  tick({ duration: 0, callback: reactiveRender });
}

export default function reactive(payload) {
  const state = { ...payload };
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
  });

  return state;
}
