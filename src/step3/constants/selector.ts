export const SELECTOR_NAME = {
  INPUT_PRICE: {
    LABEL: '#input-price-label',
    INPUT: '#input-price-input',
    FORM: '#input-price-form',
  },
  PURCHASED: {
    LOTTO: '#purchased-lotto',
    LOTTO_NUMBERS: '#purchased-lotto-numbers',
    LOTTOS: '#purchased-lottos',
    LOTTOS_LABEL: '#purchased-lottos-label',
    LOTTOS_SECTION: '#purchased-lottos-section',
    LOTTOS_TOGGLE_BUTTON: '#purchased-lottos-toggle-button',
  },
  WINNING_LOTTO_INFO: {
    FORM: '#winning-lotto-info-form',
    INPUTS: '.winning-number',
    BONUS_NUMBER_INPUT: '.bonus-number',
    WINNING_NUMBER_INPUT: '#winning-number-input',
  },
  WINNING_INFO: {
    MODAL: '.modal',
    CLOSE_MODAL: '.close-x',
    RATE_OF_RETURN_TEXT: '#rate-of-return-text',
    RESET_BUTTON: '#reset-button',
  },
} as const;

export const CLASS_NAME = {
  OPEN: 'open',
} as const;
