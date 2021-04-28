import { createStore } from './lib/flux.js';
import SETTINGS from './settings.js';
import { err, floor, random, freeze } from './lib/utils.js';

const initState = freeze({
  money: '',
  lottos: [],
  winningLotto: [],
  bonusNumber: null,
  isDetailsShow: false,
  isModalOpen: false,
});

export const ACTION_TYPE = freeze({
  BUY_LOTTOS: 'BUY_LOTTOS',
  TOGGLE_DETAILS: 'TOGGLE_DETAILS',
  CHECK_RESULT: 'CHECK_RESULT',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  RESET_STATE: 'RESET_STATE',
});

const actionTable = freeze({
  [ACTION_TYPE.BUY_LOTTOS]: ({ money, lottos }, state) => ({
    ...state,
    money,
    lottos,
  }),
  [ACTION_TYPE.TOGGLE_DETAILS]: (_, state) => ({
    ...state,
    isDetailsShow: !state.isDetailsShow,
  }),
  [ACTION_TYPE.CHECK_RESULT]: ({ winningLotto, bonusNumber }, state) => ({
    ...state,
    winningLotto,
    bonusNumber,
    isModalOpen: true,
  }),
  [ACTION_TYPE.TOGGLE_MODAL]: (_, state) => ({
    ...state,
    isModalOpen: !state.isModalOpen,
  }),
  [ACTION_TYPE.RESET_STATE]: _ => initState,
});

const reducer = (action, state = initState) =>
  actionTable[action?.type]?.(action, state) ?? { ...state };

export const { getState, dispatch, subscribe } = createStore(reducer);

export const actionCreator = (({ CONSTANT, MESSAGE }) =>
  freeze({
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
    checkResult: (winningLotto, bonusNumber) => {
      const { LOTTO_MIN, LOTTO_MAX, LOTTO_SIZE } = CONSTANT;
      const validationTarget = [...winningLotto, bonusNumber];
      if (validationTarget.some(num => num < LOTTO_MIN || num > LOTTO_MAX))
        err(MESSAGE.OUT_OF_RANGE);
      if (new Set(validationTarget).size < LOTTO_SIZE + 1)
        err(MESSAGE.DUPLICATED);

      dispatch({ type: ACTION_TYPE.CHECK_RESULT, winningLotto, bonusNumber });
    },
    toggleModal: _ => dispatch({ type: ACTION_TYPE.TOGGLE_MODAL }),
    resetState: _ => dispatch({ type: ACTION_TYPE.RESET_STATE }),
  }))(SETTINGS);
