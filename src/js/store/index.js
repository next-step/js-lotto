import { DEFAULT_PRICE, EVENT } from "../utils/const.js";
import { generateLotteries } from "../utils/lottery.js";

const event = new Event("stateChange");

export const Store = {
  state: {
    price: 0,
    amount: 0,
    lottoNumbers: [],
    checked: false,
  },
};

export function setState(key, state) {
  switch (key) {
    case EVENT.INPUT_PRICE:
      let newState = {};
      if (state.price > DEFAULT_PRICE) {
        const amount = Math.trunc(state.price / DEFAULT_PRICE);
        newState = { amount, lottoNumbers: generateLotteries(amount) };
      } else {
        newState = { amount: 0 };
      }
      Store.state = { ...Store.state, ...newState };
      break;
    default:
      Store.state = { ...Store.state, ...state };
      break;
  }
  document.dispatchEvent(event);
}
