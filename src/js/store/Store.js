import reactiveState from '../core/reactive/reactiveState.js';

export default class Store {
  constructor({ state, getter, mutation, action }) {
    this.state = reactiveState(state);
    this.getters = getter;
    this.actions = action;
    this.mutations = mutation;

    this.getter = this.getter.bind(this);
    this.dispatch = this.dispatch.bind(this);
    this.commit = this.commit.bind(this);
  }

  getter(name) {
    const get = this.getters[name];
    if (!get) {
      throw new Error(`${name} is not found in getter`);
    }

    return get(this);
  }

  dispatch(name, ...payload) {
    const act = this.actions[name];

    if (!act) {
      throw new Error(`${name} is not found in action`);
    }
    act(this, ...payload);
  }

  commit(name, payload) {
    const mutate = this.mutations[name];

    if (!mutate) {
      throw new Error(`${name} is not found in mutation`);
    }
    mutate(this, payload);
  }
}
