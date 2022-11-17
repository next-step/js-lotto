import { LOTTO } from './constants.js';

const isValidateAmount = (amount) => amount % LOTTO.MIN_PRICE === 0;
export { isValidateAmount };
