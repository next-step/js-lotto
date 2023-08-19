import {LOTTO_NUMBERS} from './constants';
import {shuffle} from '../utils';

export const generateLottoNumbers = (size = 6) => {
  return shuffle(LOTTO_NUMBERS)
    .slice(0, size)
    .sort((a, b) => a - b);
};
