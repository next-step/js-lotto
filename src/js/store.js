import { createStore } from './lib/flux.js';
import SETTINGS from './settings.js';
import { err, floor, random, freeze } from './lib/utils.js';

const initState = freeze({
  money: '',
  lottos: [],
  isDetailsShow: false,
  winningLotto: [],
  bonusNumber: null,
  resultTable: null,
  earningsRate: null,
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
  [ACTION_TYPE.CHECK_RESULT]: (
    { winningLotto, bonusNumber, resultTable, earningsRate },
    state,
  ) => ({
    ...state,
    winningLotto,
    bonusNumber,
    resultTable,
    earningsRate,
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
      [winningLotto, bonusNumber] = [winningLotto.map(Number), +bonusNumber];
      const { LOTTO_MIN, LOTTO_MAX, LOTTO_SIZE } = CONSTANT;
      const validationTarget = [...winningLotto, bonusNumber];
      if (validationTarget.some(num => num < LOTTO_MIN || num > LOTTO_MAX))
        err(MESSAGE.OUT_OF_RANGE);
      if (new Set(validationTarget).size < LOTTO_SIZE + 1)
        err(MESSAGE.DUPLICATED);

      const { money, lottos } = getState();
      const resultTable = [
        [2_000_000_000, 0],
        [30_000_000_0, 0],
        [1_500_000, 0],
        [50_000, 0],
        [5_000, 0],
      ];

      const checkLotto = lotto => {
        let rank;
        const counter = new Set([...lotto, ...winningLotto]);
        switch (counter.size) {
          case 6:
            rank = 0;
            break;
          case 7:
            rank = lotto.includes(bonusNumber) ? 1 : 2;
            break;
          case 8:
            rank = 3;
            break;
          case 9:
            rank = 4;
            break;
          default:
        }
        if (rank) resultTable[rank][1]++;
      };
      lottos.forEach(checkLotto);

      const earnings = resultTable.reduce(
        (acc, [prize, cnt]) => acc + prize * cnt,
        0,
      );
      const earningsRate = (((earnings - money) / money) * 100).toFixed(
        CONSTANT.DECIMAL_POINT,
      );
      dispatch({
        type: ACTION_TYPE.CHECK_RESULT,
        winningLotto,
        bonusNumber,
        resultTable,
        earningsRate,
      });
    },
    toggleModal: _ => dispatch({ type: ACTION_TYPE.TOGGLE_MODAL }),
    resetState: _ => dispatch({ type: ACTION_TYPE.RESET_STATE }),
  }))(SETTINGS);
