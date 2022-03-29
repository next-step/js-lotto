import { AMOUNT_UNIT, ERROR_MESSAGE } from './constants.js';
import { isEmpty } from '../helper/index.js';

const useLottoService = () => {
  const getLottoNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.trunc(Math.random() * 45) + 1);
    }
    return Array.from(numbers);
  };

  const generatedLotto = number => {
    return Array.from({ length: number }).map(() => getLottoNumbers());
  };

  const validCount = amount => {
    const count = Number(amount / AMOUNT_UNIT);
    if (isEmpty(amount) || isNaN(count)) throw new Error(ERROR_MESSAGE.REQUIRED_DIGIT);
    if (amount < AMOUNT_UNIT) throw new Error(ERROR_MESSAGE.MUST_MORE_THAN);
    if (!Number.isInteger(count)) throw new Error(ERROR_MESSAGE.MUST_REQUIRED_AMOUNT_UNIT);
    return count;
  };

  return { generatedLotto, validCount };
};

export default useLottoService;
