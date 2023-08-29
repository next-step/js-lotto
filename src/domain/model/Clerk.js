import { LOTTO_PRICE, STATE } from '../constants/index.js';

export const Clerk = {
  budget: 0,
  lottos: [],
  lottoPrice: LOTTO_PRICE,
  winningNumber: Array.from({ length: 6 }),
  bonusNumber: null,
  lottoCount: 0,
  lottoCycle: STATE.FALSE,
};
