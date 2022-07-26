import Store from './Store.js';
import createLotto from '../domain/lotto/createLotto.js';
import { PAYMENT_UNIT } from '../constants/common.js';
import { COMMIT, DISPATCH, GETTER } from './constants.js';

const state = {
  amount: null,
  lottoList: [],
  wonLotto: [],
  bonusNumber: null,
  isVisibleLottos: false,
};

const getter = {
  [GETTER.LOTTO_AMOUNT]({ state }) {
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

const action = {
  [DISPATCH.MAKE_LOTTO_LIST]({ getter, commit }) {
    const lottoAmount = getter(GETTER.LOTTO_AMOUNT);
    const lottoList = new Array(lottoAmount).fill(null).map(() => createLotto());

    commit(COMMIT.SET_LOTTO_LIST, lottoList);
  },
  [DISPATCH.RESTART_LOTTO]({ commit }) {
    commit(COMMIT.SET_AMOUNT, null);
    commit(COMMIT.SET_LOTTO_LIST, []);
    commit(COMMIT.SET_IS_VISIBLE_LOTTOS, false);
    commit(COMMIT.SET_WON_LOTTO, []);
    commit(COMMIT.SET_BONUS_NUMBER, null);
  },
};

const store = new Store({ state, getter, mutation, action });

export default store;
