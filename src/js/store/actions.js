import { getState, setState } from './state.js';
import { subject } from '../index.js';
import {
  getTicketCount,
  getTicketNumbers,
  countMatchingNumbers,
  getTotalPrize,
  getProfit,
  getWinningScore,
} from '../utils/lotto.js';
import { INITIAL_STATE } from '../utils/constant.js';

const actionCreator = newState => {
  const state = getState();
  setState({ ...state, ...newState });
  // console.log({ ...state, ...newState });
  subject.notifyAll();
};

export const setPurchasePrice = purchasePrice => {
  actionCreator({ purchasePrice });
};

export const getTickets = purchasePrice => {
  const ticketCount = getTicketCount(purchasePrice);
  const tickets = getTicketNumbers(ticketCount);
  actionCreator({ ticketCount, tickets });
};

export const toggleShowNumbers = isChecked => {
  actionCreator({ isNumberVisible: isChecked });
};

export const setWinningNumbers = numbers => {
  actionCreator({ winningNumbers: numbers });
};

export const calculatePrize = () => {
  const { tickets, purchasePrice, winningNumbers: numbers } = getState();
  const matchingNumberCounts = countMatchingNumbers(tickets, numbers);
  const winningScore = getWinningScore(matchingNumberCounts);
  const totalPrize = getTotalPrize(winningScore);
  const profit = getProfit(purchasePrice, totalPrize);
  actionCreator({ winningScore, profit });
};

export const showModal = () => {
  actionCreator({ showResult: true });
};

export const closeModal = () => {
  actionCreator({ showResult: false });
};

export const clearState = () => {
  actionCreator(INITIAL_STATE);
};
