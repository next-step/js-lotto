import { LOTTO } from './constants.js';

const dividedLottoCount = (price) => price / LOTTO.UNIT;

const hasRemainderPrice = (price) => price % LOTTO.UNIT !== 0;

export { dividedLottoCount, hasRemainderPrice };
