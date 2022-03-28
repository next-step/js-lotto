export const LOTTO = Object.freeze({
  PRICE: 1000,
  START_NUMBER: 1,
  END_NUMBER: 45,
  NUMBER_COUNT: 6,
});

export const LOTTO_WINNING_REVENUE = Object.freeze({
  FIRST: 2_000_000_000,
  SECOND: 30_000_000,
  THIRD: 1_500_000,
  FOURTH: 50_000,
  FIFTH: 5_000,
});

export const DOM = Object.freeze({
  APP_ID: 'app',
  PURCHASE_FORM_ID: 'purchase-form',
  PURCHASE_FORM_INPUT_ID: 'purchase-form-input',
  PURCHASE_FORM_BUTTON_ID: 'purchase-form-button',
  PURCHASE_SECTION_ID: 'purchase-section',
  PURCHASE_SECTION_LABEL_ID: 'purchase-section-label',
  PURCHASE_SECTION_LOTTO_NUMBERS_TOGGLE_BUTTON_ID: 'purchase-section-lotto-numbers-toggle-button',
  PURCHASE_SECTION_LOTTO_NUMBERS_FLEXBOX_ID: 'purchase-section-lotto-numbers-flex-box',
  LOTTO_ICON_CLASS: 'lotto-icon',
  LOTTO_DETAIL_CLASS: 'lotto-detail',
  WINNING_NUMBER_FORM_ID: 'winning-number-form',
  WINNING_NUMBER_CONTAINER_ID: 'winning-number-container',
  WINNING_NUMBER_CLASS: 'winning-number',
  BONUS_NUMBER_CLASS: 'bonus-number',
  OPEN_RESULT_MODAL_BUTTON_ID: 'open-result-modal-button',
  MODAL_CLASS: 'modal',
  MODAL_CLOSE_BUTTON_ID: 'modal-close-button',
  MODAL_1ST_PLACE_COUNT_ID: 'modal-1st-place-count',
  MODAL_2ND_PLACE_COUNT_ID: 'modal-2nd-place-count',
  MODAL_3RD_PLACE_COUNT_ID: 'modal-3rd-place-count',
  MODAL_4TH_PLACE_COUNT_ID: 'modal-4th-place-count',
  MODAL_5TH_PLACE_COUNT_ID: 'modal-5th-place-count',
  MODAL_YIELD_ID: 'modal-yild',
  RESTART_BUTTON_ID: 'restart-button',
});

export const ERROR_MESSAGE = Object.freeze({
  INVALID_PRICE: `로또 구입 금액을 ${LOTTO.PRICE}원 단위로 입력해 주세요.`,
  REQUIRED_PRICE: '로또 구입 금액을 입력해주세요.',
  INVALID_RANGE_LOTTO_NUMBER: `당첨 번호는 ${LOTTO.START_NUMBER}에서 ${LOTTO.END_NUMBER}사이로 입력해 주세요`,
  DUPLICATED_LOTTO_NUMBER: '당첨 번호는 겹치지 않게 입력해 주세요',
});
