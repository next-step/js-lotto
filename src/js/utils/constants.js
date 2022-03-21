export const CLASS_NAME = {
    PURCHASE_FORM: 'purchase-form',
    LOTTO_FORM: 'lotto-form',
    SECTION_TITLE_LABEL: 'section-title',
    LOTTO_LIST: 'lottos',
    TOGGLE_BUTTON: 'lotto-numbers-toggle-button',
    LOTTO_NUMBERS: 'lotto-numbers',
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
};
