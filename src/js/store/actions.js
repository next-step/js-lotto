import { getState, setState } from './state.js';
import { subject } from '../index.js';
import { getTicketCount, getLottoNumbers } from '../utils/lotto.js';

const actionCreator = newJSON => {
  const state = getState();
  setState({ ...state, ...newJSON });
  console.log({ ...state, ...newJSON });
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
