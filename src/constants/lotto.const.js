import { PROMPT_PREFIX_SYMBOL } from './prompt.const.js';

export const QUESTION_PURCHASE_AMOUNT = `${PROMPT_PREFIX_SYMBOL} 구입금액을 입력해 주세요.`;
export const QUESTION_LOTTO_ANSWER = `${PROMPT_PREFIX_SYMBOL} 당첨 번호를 입력해 주세요. `;
export const QUESTION_LOTTO_BONUS = `${PROMPT_PREFIX_SYMBOL} 보너스 번호를 입력해 주세요. `;
export const QUESTION_RESTART = `${PROMPT_PREFIX_SYMBOL} 다시 시작하시겠습니까? (y/n) `;

export const LOTTO_AMOUNT_UNIT = 1000;
export const LOTTO_AMOUNT_SEPARATOR = ',';

export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;

export const LOTTO_NUMBER_COUNT = 6;
export const LOTTO_SECOND_PLACE_DEFAULT_COUNT = 5;

export const LOTTO_CALCULATED_RANK = {
  3: 'fifth place',
  4: 'fourth place',
  5: 'third place',
  6: 'first place',
};
