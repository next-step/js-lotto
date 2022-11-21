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

export const MIN_LOTTO_PRICE = 1000;
export const MAX_LOTTO_PRICE = 100000;

export const ALERT = {
  TYPE_THOUSAND_UNIT: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
  OVER_MAX_VALUE: '최대 구매가능 금액은 100,000원 입니다.',
};

export const TITLE_WITH_VALUE_MAP = new Map([
  ['3개', 5000],
  ['4개', 50000],
  ['5개', 1500000],
  ['5개 + 보너스볼', 30000000],
  ['6개', 2000000000],
]);

export const MODAL_WIINING_TABLE_MAP = [
  {
    title: '3개',
    value: 5000,
  },
  {
    title: '4개',
    value: 50000,
  },
  {
    title: '5개',
    value: 1500000,
  },
  {
    title: '5개 + 보너스볼',
    value: 30000000,
  },
  {
    title: '6개',
    value: 2000000000,
  },
];

export const WINNING_NUMBER_INPUT_COUNT = 6;
