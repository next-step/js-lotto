import { createStore } from "./store/store.js";

export const LOTTO_PRIZE_KEY = {
  FIRST: "first",
  SECOND: "second",
  THIRD: "third",
  FOURTH: "fourth",
  FIFTH: "fifth",
};

export const LOTTO_STORE_KEY = {
  PAYMENT: "payment",
  PAYMENT_CHANGES: "paymentChanges",
  TICKET_COUNT: "ticketCount",
  LOTTO_NUMBERS: "lottoNumbers",
  LOTTO_PRIZE: "lottoPrize",
};

const lottoStore = createStore({
  [LOTTO_STORE_KEY.PAYMENT]: 0,
  [LOTTO_STORE_KEY.PAYMENT_CHANGES]: 0,
  [LOTTO_STORE_KEY.TICKET_COUNT]: 0,
  [LOTTO_STORE_KEY.LOTTO_NUMBERS]: [],
  [LOTTO_STORE_KEY.LOTTO_PRIZE]: {
    [LOTTO_PRIZE_KEY.FIRST]: 0,
    [LOTTO_PRIZE_KEY.SECOND]: 0,
    [LOTTO_PRIZE_KEY.THIRD]: 0,
    [LOTTO_PRIZE_KEY.FOURTH]: 0,
    [LOTTO_PRIZE_KEY.FIFTH]: 0,
  },
});

export default lottoStore;
