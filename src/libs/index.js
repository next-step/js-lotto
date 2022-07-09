import { PRICE_PER_LOTTO } from '../constants';

const changeAmountToCount = (amount) => amount / PRICE_PER_LOTTO;

export { changeAmountToCount };
