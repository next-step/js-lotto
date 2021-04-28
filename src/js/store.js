import { createStore } from './lib/flux.js';
import SETTINGS from './settings.js';
import { err, floor, random } from './lib/utils.js';

const initState = {
  money: '',
  lottos: [],
  isDetailsShow: false,
  isModalOpen: false,
};

export const ACTION_TYPE = {
  BUY_LOTTOS: 'BUY_LOTTOS',
  TOGGLE_DETAILS: 'TOGGLE_DETAILS',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
};

const actionTable = {
  [ACTION_TYPE.BUY_LOTTOS]: ({ money, lottos }, state) => ({
    ...state,
    money,
    lottos,
  }),
  [ACTION_TYPE.TOGGLE_DETAILS]: (_, state) => ({
    ...state,
    isDetailsShow: !state.isDetailsShow,
  }),
  [ACTION_TYPE.TOGGLE_MODAL]: (_, state) => ({
    ...state,
    isModalOpen: !state.isModalOpen,
  }),
};

const reducer = (action, state = initState) =>
  actionTable[action?.type]?.(action, state) ?? { ...state };

export const { getState, dispatch, subscribe } = createStore(reducer);

export const actionCreator = (({ CONSTANT, MESSAGE }) => ({
  buyLottos: money => {
    money = +money;
    const { PRICE, LOTTO_SIZE, LOTTO_MIN, LOTTO_MAX } = CONSTANT;

    if (money < PRICE) err(MESSAGE.MINIMUN);
    if (money % PRICE > 0) err(MESSAGE.DIVISIBLE);

    const lottos = Array.from({ length: floor(money / PRICE) }, _ => {
      const lotto = new Set();
      while (lotto.size < LOTTO_SIZE) lotto.add(random(LOTTO_MIN, LOTTO_MAX));
      return Array.from(lotto).sort((a, b) => a - b);
    });
    dispatch({ type: ACTION_TYPE.BUY_LOTTOS, money, lottos });
  },
  toggleDetails: _ => dispatch({ type: ACTION_TYPE.TOGGLE_DETAILS }),
  toggleModal: _ => dispatch({ type: ACTION_TYPE.TOGGLE_MODAL }),
}))(SETTINGS);
