import lottoConfig from '../config/lotto.config'

export const {
  LOTTO_NUMBER_DUPLICATED_ERROR,
  LOTTO_NUMBER_EMPTY_ERROR,
  LOTTO_NUMBER_OUT_OF_RANGE_ERROR,
  MY_LOTTO_LIMIT_ERROR,
  MANUAL_PURCHASE_AMOUNT_MESSAGE,
  MANUAL_PURCHASE_PROMPT_VALIDATION_ERROR,
  MANUAL_PURCHASE_PROMPT_NUMBER_OUT_OF_RANGE_ERROR,
  MANUAL_LOTTO_NUMBER_DUPLICATED_ERROR,
  MANUAL_LOTTO_AMOUNT_INCORRECT_ERROR,
  MANUAL_LOTTO_NUMBER_RANGE_ERROR,
  MANUAL_LOTTO_NUMBER_EMPTY_ERROR,
} = Object.freeze({
  MY_LOTTO_LIMIT_ERROR: `로또는 ${lottoConfig.maxMyLottoLimit}개 까지 구매할 수 있습니다.`,
  LOTTO_NUMBER_OUT_OF_RANGE_ERROR: `로또 번호는 1번부터 ${lottoConfig.maxLottoNumber}까지 입력 할 수 있습니다.`,
  LOTTO_NUMBER_DUPLICATED_ERROR: '중복된 로또 번호가 있습니다.',
  LOTTO_NUMBER_EMPTY_ERROR: '입력되지 않거나 번호에 0을 입력한 로또 번호가 있습니다.',
  MANUAL_PURCHASE_AMOUNT_MESSAGE: '수동으로 구매 할 로또의 개수를 알려주세요.',
  MANUAL_PURCHASE_PROMPT_VALIDATION_ERROR: '숫자를 입력해주세요. 예) 5',
  MANUAL_PURCHASE_PROMPT_NUMBER_OUT_OF_RANGE_ERROR: '입력된 로또 개수가 유효하지 않습니다. (1 ~ ',
  MANUAL_LOTTO_NUMBER_RANGE_ERROR: `입력한 번호의 범위가 유효하지 않은 입력창이 있습니다. (1~${lottoConfig.maxLottoNumber})`,
  MANUAL_LOTTO_NUMBER_EMPTY_ERROR: '입력하지 않은 로또 입력창이 있습니다.',
  MANUAL_LOTTO_NUMBER_DUPLICATED_ERROR: '수동 구매 입력창에 중복된 로또 번호가 있습니다.',
  MANUAL_LOTTO_AMOUNT_INCORRECT_ERROR: '수동으로 구매한 로또의 개수가 유효하지 않습니다.(올바르지 않은 조작입니다.)',
})
