export const DEFAULT_LOTTO_STATE = {
  lottoNumbers: [],
  moneyAmount: null,
  lottoPurchaseNumber: 0,
  isVisibleResult: false,
  isToggle: false,
  isVisibleModal: false,
  winningNumbers: Array.from({ length: 7 }, (value, index) => null),
};

export const MIN_LOTTO_PRICE = 1000;
export const MAX_LOTTO_PRICE = 100000;

export const ALERT = {
  TYPE_THOUSAND_UNIT: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
  OVER_MAX_VALUE: '최대 구매가능 금액은 100,000원 입니다.',
};
