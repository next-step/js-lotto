import { isNumber, isPositiveInteger } from '../../utils';
import { LOTTO_PRICE } from './constants';

export const calculateLottoCount = (amount) => {
  if (!isNumber(amount) || !isPositiveInteger(amount)) {
    throw new Error('로또를 구매하는 과정에서 문제가 생겼습니다.');
  }

  return Math.floor(amount / LOTTO_PRICE);
};
