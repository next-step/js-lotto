import ERROR from '../constants/error.js';
import { isBeyondNumberRange } from './common.js';

const isDuplicatedWithWinningNumbers = (bonus, winningNumbers) => winningNumbers.includes(bonus);

const checkValidBonus = (bonus, winningNumbers) => {
  if (isBeyondNumberRange(bonus)) throw new Error(ERROR.NUMBER.BEYOND_NUMBER_RANGE);
  if (isDuplicatedWithWinningNumbers(bonus, winningNumbers)) {
    throw new Error(ERROR.BONUS.DUPLICATED_WITH_WINNING_NUMBER);
  }
};

export default checkValidBonus;
