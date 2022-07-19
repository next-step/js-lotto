const LOTTO = {
  BONUS_NUMBER_SCORE: 1,
  WINNING_NUMBER_SCORE: 2,
  MAX_INPUT_LENGTH: 2,
  SIZE: 6,
  WINNING_INPUT_SIZE: 7,
  UNIT: 1000,
};

const LOTTO_NUMBER_UNIT = {
  min: 1,
  max: 45,
};

const ALERT_MESSAGES = {
  LOTTO_UNIT_ERROR: `로또 구입 금액을 ${LOTTO.UNIT}원 단위로 입력해 주세요.`,
  DUPLICATE_WINNING_NUMBER_ERROR: '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
};

export { LOTTO, LOTTO_NUMBER_UNIT, ALERT_MESSAGES };
