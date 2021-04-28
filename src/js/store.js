import { createStore } from './lib/flux.js';

const initState = { isModalOpen: false };

export const ACTION_TYPE = {
  CLOSE_MODAL: 'CLOSE_MODAL',
  OPEN_MODAL: 'OPEN_MODAL',
};

const actionTable = {
  [ACTION_TYPE.CLOSE_MODAL]: (_, state) => ({ ...state, isModalOpen: false }),
  [ACTION_TYPE.OPEN_MODAL]: (_, state) => ({ ...state, isModalOpen: true }),
};

const reducer = (action, state = initState) =>
  actionTable[action?.type]?.(action, state) ?? { ...state };

export const { getState, dispatch, subscribe } = createStore(reducer);

export const actionCreator = {
  closeModal: _ => dispatch({ type: ACTION_TYPE.CLOSE_MODAL }),
  openModal: _ => dispatch({ type: ACTION_TYPE.OPEN_MODAL }),
};
