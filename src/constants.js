import { makeDataAttributeIdForm } from './utils/index.js';

export const DEFAULT_LOTTO_STATE = {
  lottoNumbers: [],
  moneyAmount: null,
  lottoPurchaseNumber: 0,
  isVisibleResult: false,
  isToggle: false,
  isVisibleModal: false,
  winningNumbers: Array.from({ length: 6 }, (value, index) => null),
  bonusNumber: null,
  isVisibleAutoInput: false,
  typedManualNumber: Array.from({ length: 6 }, (value, index) => null),
  manualPurchaseNumber: 0,
  manualNumbers: [],
};

export const LOTTO_VALUE = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  MIN_PRICE: 1000,
  MAX_PRICE: 100000,
  WINNIN_INPUT_LENGTH: 6,
  MAX_LOTTO_COUNT: 6,
};

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

export const ELEMENT_DATA_ID = {
  OPEN_RESULT_MODAL_BUTTON: 'open-result-modal-button',
  LOTTO_NUMBER_INPUT: 'lotto-number-input',
  LOTTO_IMAGE_WRAPPER: 'lotto-image-wrapper',
  RESULT_TEXT: 'result-text',
  NUMBER_TOGGLE_BUTTON: 'number-toggle-button',
  LOTTO_SUBMIT_BUTTON: 'lotto-submit-button',
  MODAL_RESULT_TABLE_BODY: 'modal-result-table-body',
  INVESTMENT_RETURN: 'investment-return',
  RESTART_BUTTON: 'restart-button',
  MODAL_CLOSE_BUTTON: 'modal-close-button',
  MANUAL_SUBMIT_BUTTON: 'submit-manual-number-button',
};

export const ELEMENT_DATA_ID_FORM = makeDataAttributeIdForm(ELEMENT_DATA_ID);

export const CLICK_EVENT_MAP = new Map();
