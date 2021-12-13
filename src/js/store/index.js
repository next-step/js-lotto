import { DEFAULT_PRICE, EVENT } from "../utils/const.js";
import { generateLotteries, checkWinningNumbers, calculateProfit } from "../utils/lottery.js";

const event = new Event("stateChange");

const result = {
  "lotto-3": {
    count: 0,
    price: 5000,
  },
  "lotto-4": {
    count: 0,
    price: 50000,
  },
  "lotto-5": {
    count: 0,
    price: 1500000,
  },
  "lotto-5-bonus": {
    count: 0,
    price: 30000000,
  },
  "lotto-6": {
    count: 0,
    price: 2000000000,
  },
};

export const initialState = {
  price: 0,
  amount: 0,
  lottoNumbers: [],
  checked: false,
  showModal: false,
  winningNumbers: [],
  bonusNumber: "",
  profit: 0,
  result,
};

export const Store = {
  state: initialState,
};

export function setState(key, state) {
  switch (key) {
    case EVENT.INPUT_PRICE:
      if (state.price >= DEFAULT_PRICE) {
        const amount = Math.trunc(state.price / DEFAULT_PRICE);
        Store.state = { ...Store.state, ...state, amount, lottoNumbers: generateLotteries(amount) };
      } else {
        Store.state = { ...Store.state, amount: 0 };
      }
      break;
    case EVENT.SHOW_RESULT_MODAL:
      const winningResult = checkWinningNumbers({
        winningNumbers: state.winningNumbers,
        bonusNumber: state.bonusNumber,
        lottoNumbers: Store.state.lottoNumbers,
        result: Store.state.result,
      });
      const profit = calculateProfit(winningResult, Store.state.price);

      Store.state = {
        ...Store.state,
        ...state,
        result: winningResult,
        profit,
      };
      break;
    case EVENT.RETRY:
      Store.state = { ...initialState };
      break;
    default:
      Store.state = { ...Store.state, ...state };
      break;
  }
  document.dispatchEvent(event);
}
