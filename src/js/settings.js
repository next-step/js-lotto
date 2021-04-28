const { freeze } = Object;

export default freeze({
  ID: freeze({
    APP: 'app',
    PRICE_FORM: 'price-form',
    PURCHASE_DETAILS: 'purchase-details',
    WINNING_FORM: 'winning-form',
    WINNING_RESULT: 'winning-result',
  }),
  KLASS: freeze({
    MODAL: 'modal',
    MODAL_OPEN: 'open',
    MODAL_CLOSE: 'modal-close',
    OPEN_MODAL_BUTTON: 'open-result-modal-button',
    NUMBERS_TOGGLE_BUTTON: 'lotto-numbers-toggle-button',
    FLEX_COL: 'flex-col',
    LOTTO_WRAPPER: 'lotto-wrapper',
    LOTTO_DETAIL: 'lotto-detail',
    WINNING_NUMBER: 'winning-number',
    BONUS_NUMBER: 'bonus-number',
    DUMMY: '',
  }),
  TAG: freeze({
    INPUT: 'input',
    BUTTON: 'button',
  }),
  EVENT: freeze({
    CLICK: 'click',
    KEYDOWN: 'keydown',
  }),
  KEYCODE: freeze({
    ENTER: 'Enter',
  }),
  MESSAGE: freeze({
    MINIMUN: '로또 구입 금액을 단위 가격 이상 입력해 주세요.',
    DIVISIBLE: '로또 구입 금액을 가격 단위로 입력해 주세요.',
    DUPLICATED: '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
    OUT_OF_RANGE: '입력 범위 외 숫자는 입력할 수 없습니다.',
  }),
  CONSTANT: freeze({
    PRICE: 1000,
    LOTTO_SIZE: 6,
    LOTTO_MIN: 1,
    LOTTO_MAX: 45,
    EMPTY_STRING: '',
    DECIMAL_POINT: 2,
  }),
  DELIMITER: freeze({
    LOTTO_NUMBER: ', ',
    EMPTY_STRING: '',
  }),
});
