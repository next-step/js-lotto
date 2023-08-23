import { LOTTO_PRICE, LOTTO_RETRY_CODE } from '../../src/js/constants/lotto-config.js';
import deepFreeze from '../../src/js/utils/deepFreeze.js';

export const DEFAULT_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];

export const LOTTO_REWARD_DUMMY = deepFreeze({
  FIRST: [1, 2, 3, 4, 5, 6],
  SECOND: [1, 2, 3, 4, 5, 7],
  THIRD: [1, 2, 3, 4, 5, 7],
  FOURTH: [1, 2, 3, 4, 7, 8],
  FIFTH: [1, 2, 3, 7, 8, 9],
  LOST: [7, 8, 9, 10, 11, 12],
});

export const MATCHED_BONUS = 6;

export const UNMATCHED_BONUS = 0;

export const INVALID_MONEY = ['100', '-1000'];

export const VALID_MONEY = String(LOTTO_PRICE);

export const MOCKED_MONEY = [...INVALID_MONEY, VALID_MONEY];

export const INVALID_QUANTITY_WINNING_NUMBERS = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5, 6, 7],
];

export const INVALID_RANGE_WINNING_NUMBERS = [
  [0, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 46],
];

export const DUPLICATED_WINNING_NUMBERS = [1, 2, 3, 4, 5, 5];

export const VALID_WINNING_NUMBERS = LOTTO_REWARD_DUMMY.SECOND;

export const MOCKED_WINNING_NUMBERS = [
  ...INVALID_QUANTITY_WINNING_NUMBERS,
  ...INVALID_RANGE_WINNING_NUMBERS,
  DUPLICATED_WINNING_NUMBERS,
  VALID_WINNING_NUMBERS,
];

export const DUPLICATED_BONUS = VALID_WINNING_NUMBERS[0];

export const INVALID_RANGE_BONUS = [0, 46];

export const VALID_BONUS = MATCHED_BONUS;

export const MOCKED_BONUS = [DUPLICATED_BONUS, ...INVALID_RANGE_BONUS, VALID_BONUS];

export const INVALID_RETRY_CODE = ['123', '네'];

export const MOCKED_RETRY_CODE = [...INVALID_RETRY_CODE, LOTTO_RETRY_CODE.REJECT];
