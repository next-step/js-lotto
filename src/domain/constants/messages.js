import { LOTTO_PRICE } from "./index.js";

export const ERROR = Object.freeze({
  NOT_NUMBER : '숫자를 입력해주세요.',
  NOT_ENOUGH_MONEY : `로또 구입 금액은 ${LOTTO_PRICE}원 이상이어야 합니다.`,
  NOT_POSITIVE_NUMBER : '양의 정수를 입력해주세요.',
  NOT_WINNING_NUMBER_QTY : '당첨 번호는 6개여야 합니다.',
  NOT_BONUS_NUMBER_QTY : '당첨 번호는 1개여야 합니다.',
  NOT_NUMBER_RANGE : '당첨 번호는 1~45 사이의 숫자여야 합니다.',
  NOT_NUMBER_UNIQUE : '중복된 숫자가 있습니다.',
})