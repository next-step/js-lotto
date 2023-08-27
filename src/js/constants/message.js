export const ERROR_MESSAGE = {
  INVALID_NUMBER: '올바른 숫자가 아닙니다!',
  INVALID_MUTATIONS: '존재하지 않는 mutation입니다!',
  INVALID_ACTIONS: '존재하지 않는 action입니다!',
  NOT_ACCESS_STATE: 'mutation을 통해 state를 변경할 수 있습니다.',
  INVALID_LOTTO_PAYMENT_TYPE: '⚠️ 구입 금액은 숫자여야만 합니다! ⚠️\n',
  INVALID_LOTTO_PAYMENT:
    '⚠️ 구입 금액은 기본 금액인 1000원 이상이어야 합니다! ⚠️\n',
  INVALID_LOTTO_BONUS_NUMBER_TYPE:
    '⚠️ 보너스 번호는 숫자로만 입력해야 합니다! ⚠️\n',
  INVALID_LOTTO_BONUS_NUMBER_RANGE:
    '⚠️ 보너스 번호는 1부터 45 이하로만 입력이 가능합니다! ⚠️\n',
  DUPLICATED_LOTTO_BONUS_NUMBER:
    '⚠️ 보너스 번호는 당첨 번호에 없는 숫자로만 입력해야 합니다! ⚠️\n',
  INVALID_LOTTO_WIN_NUMBER_TYPE:
    '⚠️ 딩첨 번호는 숫자로만 입력해야 합니다! ⚠️\n',
  INVALID_LOTTO_WIN_NUMBER_RANGE:
    '⚠️ 당첨 번호는 1부터 45 이하로만 입력이 가능합니다! ⚠️\n',
  DUPLICATED_LOTTO_WIN_NUMBER:
    '⚠️ 당첨 번호는 중복 없이 6개를 입력해야 합니다! ⚠️\n'
}

export const INFO_MESSAGE = {
  REQUEST_PAYMENT: '구입금액을 입력해 주세요.\n',
  REQUEST_WIN_NUMBER: '당첨 번호를 입력해 주세요.\n',
  REQUEST_BONUS_NUMBER: '보너스 번호를 입력해 주세요.\n',
  REQUEST_RETRY: '다시 시작하시겠습니까? (y/n)\n'
}
