import Store from './store.js';
import actions from './actions.js';
import mutations from './mutations.js';

const defaultState = {
  price: 0,
  lottoNumbers: [],
};

export const store = new Store({
  state: { ...defaultState },
  actions,
  mutations,
});
