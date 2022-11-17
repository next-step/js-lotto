import { LOTTO } from './constants.js';

const isValidateAmount = (amount) => amount % LOTTO.PRICE_UNIT === 0;
export { isValidateAmount };
