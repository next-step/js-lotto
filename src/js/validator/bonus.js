import ERROR from '../constants/error';
import { isBeyondNumberRange } from './common';

const checkValidBonus = (bonus) => {
  if (isBeyondNumberRange(bonus)) throw new Error(ERROR.WINNING_NUMBERS.BEYOND_NUMBER_RANGE);
};

export default checkValidBonus;
