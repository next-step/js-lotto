export const DEFAULT_TYPED_NUMBERS = Array.from({ length: 6 }, (value, index) => null);

export const DEFAULT_LOTTO_STATE = {
  lottoNumbers: [],
  moneyAmount: null,
  lottoPurchaseNumber: 0,
  isVisibleResult: false,
  isToggle: false,
  isVisibleModal: false,
  winningNumbers: DEFAULT_TYPED_NUMBERS,
  bonusNumber: null,
  isVisibleAutoInput: false,
  typedManualNumber: DEFAULT_TYPED_NUMBERS,
  manualPurchaseNumber: 0,
  manualNumbers: [],
};
