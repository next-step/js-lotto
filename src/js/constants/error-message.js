export const ERROR_MESSAGE = Object.freeze({
  EMPTY_LOTTO_NUMBERS: 'Lotto 숫자가 생성되지 않았습니다.',
  NOT_VALID_LOTTO_AMOUNT_UNIT: (unit) =>
    `로또 구입 금액을 ${unit}원 단위로 입력해 주세요.`,
  NOT_VALID_RANDOM_RANGE: '범위의 시작 숫자기 끝 숫자보다 클 수 없습니다.',
});
