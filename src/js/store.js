import { createStore } from './lib/flux.js';
import SETTINGS from './settings.js';
import { err, floor, random } from './lib/utils.js';

const initState = {
  money: '',
  lottos: [],
  isModalOpen: false,
};

export const ACTION_TYPE = {
  BUY_LOTTOS: 'BUY_LOTTOS',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
};

const actionTable = {
  [ACTION_TYPE.BUY_LOTTOS]: ({ money, lottos }, state) => ({
    ...state,
    money,
    lottos,
  }),
  [ACTION_TYPE.OPEN_MODAL]: (_, state) => ({ ...state, isModalOpen: true }),
  [ACTION_TYPE.CLOSE_MODAL]: (_, state) => ({ ...state, isModalOpen: false }),
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
  openModal: _ => dispatch({ type: ACTION_TYPE.OPEN_MODAL }),
  closeModal: _ => dispatch({ type: ACTION_TYPE.CLOSE_MODAL }),
}))(SETTINGS);
