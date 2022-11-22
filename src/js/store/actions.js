import { getState, setState } from './state.js';
import { subject } from '../index.js';
import { getTicketCount, getLottoNumbers } from '../utils/lotto.js';

const actionCreator = newState => {
  const state = getState();
  setState({ ...state, ...newState });
  console.log({ ...state, ...newState });
  subject.notifyAll();
};

export const setPrice = purchasePrice => {
  const ticketCount = getTicketCount(purchasePrice);
  const tickets = getLottoNumbers(ticketCount);
  actionCreator({ purchasePrice, ticketCount, tickets });
};

export const toggleShowNumbers = isChecked => {
  actionCreator({ isNumberVisible: isChecked });
};
