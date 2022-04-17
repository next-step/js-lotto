export const CLASS_NAME = {
    PURCHASE_FORM: 'purchase-form',
    LOTTO_FORM: 'lotto-form',
    SECTION_TITLE_LABEL: 'section-title',
    LOTTO_LIST: 'lottos',
    TOGGLE_BUTTON: 'lotto-numbers-toggle-button',
    LOTTO_NUMBERS: 'lotto-numbers',
    MODAL: 'modal',
    RESULT_BUTTON: 'open-result-modal-button',
    WINNING_NUMBER: 'winning-number',
    BONUS_NUMBER: 'bonus-number',
    RESULT_TABLE: 'result-table',
    PROFIT: 'profit',
    RESET: 'reset',
};

export const NUM = {
    MAX_RANDOM: 45,
    MIN_RANDOM: 1,
    MAX_LOTTO_LENGTH: 6,
    LOTTO_PRICE: 1000,
    MAX_PURCHASE_AMOUNT: 10000,
};

export const MESSAGE = {
    REQUIRED: '이 입력란을 작성하세요.',
    MIN_VALUE: `값은 ${NUM.LOTTO_PRICE} 이상이어야 합니다.`,
    MAX_VALUE: `값은 ${NUM.MAX_PURCHASE_AMOUNT} 이하여야 합니다.`,
    MIN_NUMBER: `값은 ${NUM.MIN_RANDOM} 이상이어야 합니다.`,
    MAX_NUMBER: `값은 ${NUM.MAX_RANDOM} 이하여야 합니다.`,
};

export const RANKING_TABLE = {
    0: 0,
    1: 0,
    2: 0,
    3: 5,
    4: 4,
    5: 3,
    6: 1,
};

export const PRICE_TABLE = {
    5: 5000,
    4: 50000,
    3: 1500000,
    2: 30000000,
    1: 2000000000,
};
