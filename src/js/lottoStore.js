import { createStore } from "./store/store.js";

export const LOTTO_STORE_KEY = {
  PAYMENT: "payment",
  PAYMENT_CHANGES: "paymentChanges",
  TICKET_COUNT: "ticketCount",
  LOTTO_NUMBERS: "lottoNumbers",
};

const lottoStore = createStore({
  [LOTTO_STORE_KEY.PAYMENT]: 0,
  [LOTTO_STORE_KEY.PAYMENT_CHANGES]: 0,
  [LOTTO_STORE_KEY.TICKET_COUNT]: 0,
  [LOTTO_STORE_KEY.LOTTO_NUMBERS]: [],
});

export default lottoStore;
