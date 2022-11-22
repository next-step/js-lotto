export const DEFAULT_LOTTO_STATE = {
  lottoNumbers: [],
  moneyAmount: null,
  lottoPurchaseNumber: 0,
  isVisibleResult: false,
  isToggle: false,
  isVisibleModal: false,
  winningNumbers: Array.from({ length: 6 }, (value, index) => null),
  bonusNumber: null,
};

export const LOTTO_MIN_VALUE = 1;
export const LOTTO_MAX_VALUE = 45;
export const MIN_LOTTO_PRICE = 1000;
export const MAX_LOTTO_PRICE = 100000;
export const MAX_WINNING_INPUT_LENGTH = 6;

export const ALERT = {
  TYPE_THOUSAND_UNIT: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
  OVER_MAX_VALUE: '최대 구매가능 금액은 100,000원 입니다.',
  NOT_ALL_TYPED_WINNING_INPUT: '7개의 값을 모두 입력해주세요',
  IN_RANGE_WINNING_INPUT: '1이상 45이하의 숫자를 입력해주세요',
  DUPLICATE_VALUE_EXIST: '중복된 값이 있습니다.',
};

export const TITLE_WITH_VALUE_MAP = new Map([
  ['3개', 5000],
  ['4개', 50000],
  ['5개', 1500000],
  ['5개 + 보너스볼', 30000000],
  ['6개', 2000000000],
]);
