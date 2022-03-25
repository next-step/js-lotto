export const LOTTO_MAX_NUMBER = 45;
export const LOTTO_UNIT = 1000;
export const MIN_PURCHASE_PRICE = 1000;
export const MAX_PURCHASE_PRICE = 100000;

export const MESSAGE = {
    ERROR: {
        MIN_PURCHASE: `금액은 ${MIN_PURCHASE_PRICE}이상이어야 합니다.`,
        MAX_PURCHASE: `금액은 ${MAX_PURCHASE_PRICE}이야여야 합니다.`,
        UNIT_MISMATCH: `금액은 ${LOTTO_UNIT}단위로 입력해야 합니다.`,
        EXIST_WINNING_NUMBER: `중복된 당첨 번호가 있습니다.`,
        OVER_MAX_NUMBER: `${LOTTO_MAX_NUMBER}가 초과하는 당첨 번호가 존재합니다.`,
    },
};
