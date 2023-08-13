import { LOTTO_PRICE } from "./index.js";

export const ERRORS = Object.freeze({
  NOT_NUMBER : '숫자를 입력해주세요.',
  NOT_ENOUGH_MONEY : `로또 구입 금액은 ${LOTTO_PRICE}원 이상이어야 합니다.`,
  NOT_POSITIVE_NUMBER : '양의 정수를 입력해주세요.',
  NOT_WINNING_NUMBER_QTY : '당첨 번호는 6개여야 합니다.',
  NOT_BONUS_NUMBER_QTY : '당첨 번호는 1개여야 합니다.',
  NOT_IN_RANGE : '당첨 번호는 1~45 사이의 숫자여야 합니다.',
  NOT_NUMBER_UNIQUE: '중복된 숫자가 있습니다.',
  NOT_BONUS_NUMBER_UNIQUE: '당첨 번호와 중첩되는 숫자가 있습니다.',
  MAX_ATTEMPT_EXCEEDED: '최대 시도 횟수를 초과하였습니다.'
})

export const MESSAGES = Object.freeze({
  ASK_PURCHASE_MONEY : '구입금액을 입력해주세요.',
  ASK_WINNING_NUMBER : '\n당첨 번호를 입력해 주세요.',
  ASK_BONUS_NUMBER : '\n보너스 번호를 입력해 주세요.',
  LOTTO_RESULT: '\n당첨 통계',
})

