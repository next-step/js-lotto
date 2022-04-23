export const TITLE_SELECTOR = '.title';
export const MONEY_INPUT_SELECTOR = '.money-input';
export const MONEY_INPUT_BUTTON_SELECTOR = '.money-input-button';
export const TICKET_SELECTOR = '.ticket';
export const TICKET_NOTICE_SELECTOR = '.ticket-notice';
export const TICKET_NUMBERS_SELECTOR = '.ticket-numbers';
export const TICKET_TOGGLE_BUTTON_SELECTOR = '.ticket-toggle-button';
export const WINNING_NUMBER_SELECTOR = '.winning-number';
export const BONUS_NUMBER_SELECTOR = '.bonus-number';
export const OPEN_RESULT_MODAL_BUTTON_SELECTOR = '.open-result-modal-button';
export const RESTART_BUTTON_SELECTOR = '.restart-button';
export const RATE_OF_RETURN_SELECTOR = '.rate-of-return';
export const WINNING_COUNT_SELECTOR = '.winning-count';
export const SELECTORS = {
  TITLE_SELECTOR: '.title',
  MONEY_INPUT_SELECTOR: '.money-input',
  MONEY_INPUT_BUTTON_SELECTOR: '.money-input-button',
  TICKET_SELECTOR: '.ticket',
  TICKET_NOTICE_SELECTOR: '.ticket-notice',
  TICKET_NUMBERS_SELECTOR: '.ticket-numbers',
  TICKET_TOGGLE_BUTTON_SELECTOR: '.ticket-toggle-button',
  WINNING_NUMBER_SELECTOR: '.winning-number',
  BONUS_NUMBER_SELECTOR: '.bonus-number',
  OPEN_RESULT_MODAL_BUTTON_SELECTOR: '.open-result-modal-button',
  RESTART_BUTTON_SELECTOR: '.restart-button',
  RATE_OF_RETURN_SELECTOR: '.rate-of-return',
  WINNING_COUNT_SELECTOR: '.winning-count',
};

export const PRICE = 1000;
export const MAX_NUMBER = 45;
export const MIN_NUMBER = 1;
export const NUMBERS_COUNT = 6;
export const HIGHEST_MONEY_LIMIT = 100000;
export const LOWEST_MONEY_LIMIT = 1000;
export const MIN_WINNING_COUNT = 3;
export const FIRST_PLACE = 6;
export const SECOND_PLACE = '5+bonus';
export const THIRD_PLACE = 5;
export const FOURTH_PLACE = 4;
export const FIFTH_PLACE = 3;
export const FIRST_PLACE_RETURN = 2000000000;
export const SECOND_PLACE_RETURN = 30000000;
export const THIRD_PLACE_RETURN = 1500000;
export const FOURTH_PLACE_RETURN = 50000;
export const FIFTH_PLACE_RETURN = 5000;
export const WINNING_BOUNS_NUMBER_COUNT = 7;
export const WINNING_NUMBER_COUNT = 6;
export const BONUS_NUMBER_COUNT = 1;
export const WINNING_MIN_NUMBER = 1;
export const WINNING_MAX_NUMBER = 45;
export const EMPTY_INPUT_NUMBER = 0;
export const WINNING_NUMBER_INPUT_COUNT = 6;
export const MOCKED_MONEY = 1000;
export const MOCKED_NUMBER = 25;
export const SAME_NUMBER = 15;
export const INITIAL_WINNING_COUNT = 0;
export const NOT_DIVISIBLE_MONEY_BY_THOUSAND_TEXT = `로또 구입 금액을 ${PRICE.toLocaleString()} 단위로 입력해 주세요.`;
export const NOT_UPPER_THAN_LOWER_LIMIT = `값은 ${LOWEST_MONEY_LIMIT.toLocaleString()} 이상이어야 합니다.`;
export const NOT_LOWER_THAN_UPPER_LIMIT = `값은 ${HIGHEST_MONEY_LIMIT.toLocaleString()} 이하여야 합니다.`;
export const NOT_ALL_NUMBERS_INPUT =
  '당첨 번호 및 보너스 번호가 모두 입력되어야 합니다.';
export const NOT_ALL_NUMBERS_UPPER_THAN_MIN_NUMBER = `당첨 번호 및 보너스 번호의 값은 ${MIN_NUMBER} 이상이어야 합니다.`;
export const NOT_ALL_NUMBERS_LOWER_THAN_MAX_NUMBER = `당첨 번호 및 보너스 번호의 값은 ${MAX_NUMBER} 이하여야 합니다.`;
export const NOT_ALL_NUMBERS_UNIQUE =
  '로또 번호에는 중복된 번호를 입력할 수 없습니다.';
export const EACH = '개';
export const NO_WIN_RATE_OF_RETURN = '-100%';
export const ONE_FIRST_PLACE_RATE_OF_RETURN = '199999900%';
