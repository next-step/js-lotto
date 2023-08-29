export const ERROR_MESSAGE = Object.freeze({
  EMPTY_LOTTO_NUMBERS: '로또 번호가 생성되지 않았습니다.',
  DUPLICATED_LOTTO_NUMBER: '로또 번호는 중복되면 안됩니다.',
  DUPLICATED_BONUS_NUMBER: '보너스 번호는 당첨 번호와 중복되면 안됩니다.',
  NOT_VALID_LOTTO_NUMBER_LENGTH: '로또 번호는 6개이어야 합니다.',
  NOT_VALID_LOTTO_NUMBER_RANGE: '로또 번호는 1이상 45이하 정수이어야 합니다.',
  NOT_VALID_LOTTO_AMOUNT_UNIT: (unit) =>
    `로또 구입 금액을 ${unit}원 단위로 입력해 주세요.`,
  NOT_VALID_RANDOM_RANGE: '범위의 시작 숫자기 끝 숫자보다 클 수 없습니다.',
  NOT_VALID_LOTTO_NUMBER: '로또 번호는 정수이어야 합니다.',
  NOT_VALID_RESTART_ANSWER: 'y 또는 n 을 입력하세요',
});
