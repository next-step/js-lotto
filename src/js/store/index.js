import { PAYMENT_UNIT } from '../constants/common.js';
import reactiveState from '../core/reactive/reactiveState.js';
import createLotto from '../domain/lotto/createLotto.js';
import { COMMIT, DISPATCH } from './constants.js';
import createCommit from './createCommit.js';
import createDispatch from './createDispatch.js';

const state = reactiveState({
  amount: null,
  lottoList: [],
  wonLotto: [],
  bonusNumber: null,
  isVisibleLottos: false,
});

const getter = {
  getLottoAmount() {
    return Math.floor(state.amount / PAYMENT_UNIT);
  },
};

const mutation = {
  [COMMIT.SET_AMOUNT]({ state }, payload) {
    state.amount = payload;
  },
  [COMMIT.SET_LOTTO_LIST]({ state }, payload) {
    state.lottoList = payload;
  },
  [COMMIT.SET_IS_VISIBLE_LOTTOS]({ state }, payload) {
    state.isVisibleLottos = payload;
  },
  [COMMIT.SET_WON_LOTTO]({ state }, payload) {
    state.wonLotto = payload;
  },
  [COMMIT.SET_BONUS_NUMBER]({ state }, payload) {
    state.bonusNumber = payload;
  },
};

const commit = createCommit({ state, mutation, getter });

const action = {
  [DISPATCH.MAKE_LOTTO_LIST]() {
    const lottoAmount = getter.getLottoAmount();
    const lottoList = new Array(lottoAmount).fill(null).map(() => createLotto());

    commit(COMMIT.SET_LOTTO_LIST, lottoList);
  },
  [DISPATCH.RESTART_LOTTO]() {
    commit(COMMIT.SET_AMOUNT, null);
    commit(COMMIT.SET_LOTTO_LIST, []);
    commit(COMMIT.SET_IS_VISIBLE_LOTTOS, false);
    commit(COMMIT.SET_WON_LOTTO, []);
    commit(COMMIT.SET_BONUS_NUMBER, null);
  },
};

const dispatch = createDispatch({ state, action, mutation, getter });

export default { state: Object.freeze(state), getter, dispatch, commit };
