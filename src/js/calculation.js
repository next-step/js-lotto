import { LOTTO } from './constants.js';

const dividedLottoCount = (price) => price / LOTTO.UNIT;

const hasRemainderPrice = (price) => price % LOTTO.UNIT !== 0;

const calculatedRevenueRate = (revenue, price) => ((revenue - price) / price) * 100;

export { dividedLottoCount, hasRemainderPrice, calculatedRevenueRate };
