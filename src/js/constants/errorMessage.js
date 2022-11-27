import { LOTTO_CONSTRAINT } from './lottoConstraint.js';

export const ERROR_MESSAGE = {
  INVALID_PRICE_UNIT: `${LOTTO_CONSTRAINT.PRICE_UNIT}원 단위의 구입 금액을 입력해주세요.`,
  INVALID_OVER_MIN_PRICE: `${LOTTO_CONSTRAINT.PRICE_UNIT}원 이상의 구입 금액을 입력해주세요`,
  INVALID_NUMBER_WITHIN_RANGE: `${LOTTO_CONSTRAINT.MIN_IN_LOTTO_NUMBER} ~ ${LOTTO_CONSTRAINT.MAX_IN_LOTTO_NUMBER}사이의 당첨 번호와 보너스를 입력해주세요.`,
  DUPLICATED_NUMBER: `당첨 번호와 보너스 번호는 서로 중복되지 않게 입력해주세요.`,
};
