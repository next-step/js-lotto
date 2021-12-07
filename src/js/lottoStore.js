import { WINNING_MONEY } from "./constants/lotto.js";
import { createStore } from "./store/store.js";
import { getMatchedNumbersCount } from "./utils/number.js";

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
  WINNGIN_NUMBERS: "winningNumbers",
  BONUS_NUMBER: "bonusNumber",
  PROFIT_RATE: "ProfitRate",
};

const initialState = {
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
  [LOTTO_STORE_KEY.WINNGIN_NUMBERS]: [],
  [LOTTO_STORE_KEY.BONUS_NUMBER]: -1,
  [LOTTO_STORE_KEY.PROFIT_RATE]: 0,
};

const lottoStore = createStore(initialState);

export const lottoStoreActions = {
  reset() {
    Object.keys(initialState).forEach((storeKey) => {
      lottoStore.setState(storeKey, initialState[storeKey]);
    });
  },

  evalutateLottoPrize() {
    const lottoPrize = initialState[LOTTO_STORE_KEY.LOTTO_PRIZE];
    const lottoNumbers = lottoStore.selectState(LOTTO_STORE_KEY.LOTTO_NUMBERS);
    const winningNumbers = lottoStore.selectState(LOTTO_STORE_KEY.WINNGIN_NUMBERS);
    const bonusNumber = lottoStore.selectState(LOTTO_STORE_KEY.BONUS_NUMBER);

    lottoNumbers.forEach((lotto) => {
      switch (getMatchedNumbersCount(lotto, winningNumbers)) {
        case 6:
          lottoPrize[LOTTO_PRIZE_KEY.FIRST]++;
          break;
        case 5:
          if (lotto.includes(bonusNumber)) {
            lottoPrize[LOTTO_PRIZE_KEY.SECOND]++;
          } else {
            lottoPrize[LOTTO_PRIZE_KEY.THIRD]++;
          }
          break;
        case 4:
          lottoPrize[LOTTO_PRIZE_KEY.FOURTH]++;
          break;
        case 3:
          lottoPrize[LOTTO_PRIZE_KEY.FIFTH]++;
          break;
      }
    });

    lottoStore.setState(LOTTO_STORE_KEY.LOTTO_PRIZE, lottoPrize);
  },

  evalutateProfitRate() {
    const lottoPrize = lottoStore.selectState(LOTTO_STORE_KEY.LOTTO_PRIZE);
    const payment = lottoStore.selectState(LOTTO_STORE_KEY.PAYMENT);
    const totalMoney = Object.keys(lottoPrize).reduce((sum, key) => sum + lottoPrize[key] * WINNING_MONEY[key], 0);

    lottoStore.setState(LOTTO_STORE_KEY.PROFIT_RATE, ((totalMoney - payment) / payment) * 100);
  },
};

export default lottoStore;
