export const CYPRESS_SELECTOR = {
  INPUT_PRICE: {
    LABEL: '[data-cy=input-price-label]',
    INPUT: '[data-cy=input-price-input]',
    FORM: '[data-cy=input-price-form]',
  },
  WINNING_LOTTO_INFO: {
    WINNING_NUMBER_INPUTS_CONTAINER: '[data-cy=winning-number-inputs-container]',
    FORM: '[data-cy=winning-lotto-info-form]',
    BONUS_NUMBER_INPUT: '[data-cy=bonus-number-input]',
    WINNING_NUMBER_INPUT: '[data-cy=winning-number-input]',
  },
  PURCHASED: {
    LOTTOS_SECTION: '[data-cy=purchased-lottos-section]',
    LOTTO_ICON: '[data-cy=purchased-lotto-icon]',
    LOTTO: '[data-cy=purchased-lotto]',
    LOTTO_NUMBERS: '[data-cy=purchased-lotto-numbers]',
    LOTTOS_TOGGLE_BUTTON: '[data-cy=purchased-lottos-toggle-button]',
  },
  WINNING_INFO: {
    MODAL: '[data-cy=modal]',
    CLOSE_MODAL: '[data-cy=modal-close]',
    RESET_BUTTON: '[data-cy=reset-button]',
  },
} as const;
