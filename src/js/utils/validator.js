import { LOTTO } from './constants.js';

const isValidateAmount = (amount) => amount % LOTTO.PRICE_UNIT === 0;

const isDuplicatedNumber = (lottoNumbers) => new Set(lottoNumbers).size !== lottoNumbers.length;
export { isValidateAmount, isDuplicatedNumber };
