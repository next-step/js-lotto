export const SELECTOR = {
    ID: {
        APP: "#app",
        PURCHASE_PRICE_INPUT: "#purchase-price-input",
        PURCHASE_BUTTON: "#purchase-button",
        LOTTO_WINNING_AREA: "#lotto-winning-area",
        LOTTO_PURCHASE_AREA: "#lotto-purchase-area",
        LOTTO_AMOUNT_AREA: "#lotto-amount-area",
        LOTTO_TICKET_AREA: "#lotto-ticket-area",
        LOTTO_WINNING_AREA: "#lotto-winning-area",
        OPEN_RESULT_MODAL_BUTTON: "#open-result-modal-button",
        RESULT_MODAL: "#result_modal",
        RESULT_MODAL_CLOSE: "#result_modal_close"
    },
    CLASS: {
        LOTTO: ".lotto",
        LOTTO_NUMBER_TOGGLE_BUTTON: ".lotto-numbers-toggle-button",
        LOTTO_DETAIL: ".lotto-detail",
        LOTTO_TICKET: ".lotto-ticket",
        SWITCH: ".switch",
        FLEX_COL: ".flex-col",
        DISPLAY_NONE: ".d-none",
        OPEN: ".open",
        WINNING_NUMBER: ".winning-number",
        BONUS_NUMBER: ".bonus-number"
    },
};

export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;
export const LOTTO_TICKET_LENGTH = 6;
export const LOTTO_UNIT = 1000;
export const MIN_PURCHASE_PRICE = 1000;
export const MAX_PURCHASE_PRICE = 100000;
export const MAX_PURCHASE_AMOUNT = MAX_PURCHASE_PRICE / LOTTO_UNIT;

export const MESSAGE = {
    ERROR: {
        MIN_PURCHASE: `금액은 ${MIN_PURCHASE_PRICE}이상이어야 합니다.`,
        MAX_PURCHASE: `금액은 ${MAX_PURCHASE_PRICE}이야여야 합니다.`,
        UNIT_MISMATCH: `금액은 ${LOTTO_UNIT}단위로 입력해야 합니다.`,
        EXIST_WINNING_NUMBER: `중복된 당첨 번호가 있습니다.`,
        OVER_MAX_NUMBER: `${LOTTO_MAX_NUMBER}가 초과하는 당첨 번호가 존재합니다.`,
    },
};
