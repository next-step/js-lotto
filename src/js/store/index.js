import createLotto from '../lotto/createLotto.js';
import { reactiveState } from '../reactive/index.js';
import { COMMIT, DISPATCH } from '../constants/store.js';
import { PAYMENT_UNIT } from '../constants/common.js';

const state = reactiveState({
  amount: null,
  lottoList: [],
  isVisibleLottos: false,
});

const getter = {
  getLottoAmount() {
    return Math.floor(state.amount / PAYMENT_UNIT);
  },
};

const mutation = {
  [COMMIT.SET_AMOUNT](payload) {
    state.amount = payload;
  },

  [COMMIT.SET_LOTTO_LIST](payload) {
    state.lottoList = payload;
  },
  [COMMIT.SET_IS_VISIBLE_LOTTOS](payload) {
    state.isVisibleLottos = payload;
  },
};

const commit = (name, payload) => {
  const mutate = mutation[name];
  if (!mutate) {
    throw new Error(`${name} is not found in mutation`);
  }
  mutate(payload);
};

const action = {
  [DISPATCH.MAKE_LOTTO_LIST]() {
    const lottoAmount = getter.getLottoAmount();
    const lottoList = new Array(lottoAmount).fill(null).map(() => createLotto());

    commit(COMMIT.SET_LOTTO_LIST, lottoList);
  },
};

const dispatch = (name, ...payload) => {
  const act = action[name];
  if (!act) {
    throw new Error(`${name} is not found in action`);
  }
  act(...payload);
};

export default { state: Object.freeze(state), getter, dispatch, commit };
