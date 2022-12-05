import { LOTTO } from './constants.js';

const isValidateAmount = (amount) => amount % LOTTO.PRICE_UNIT === 0;

const isDuplicatedNumber = (lottoNumbers, bonusNumber) =>
  new Set(lottoNumbers).size !== lottoNumbers.length ||
  lottoNumbers.includes(bonusNumber);
export { isValidateAmount, isDuplicatedNumber };
