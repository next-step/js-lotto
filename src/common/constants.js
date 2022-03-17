export const PRICE_UNIT = 1000;
export const PRICE_LIMIT = 100000;

const CONSTANTS = Object.freeze({
  INITIAL: {
    IS_PREVIOUS_PURCHASE_OFF: false,
    USER_INPUT_PRICE: null,
    VISIABLE_LOTTO_TOGGLE_OFF: false,
    MY_LOTTOS: [],
    LOTTO_WINNING_NUMBER: [],
    LOTTO_BONUS_NUMBER: null,
  },
  COMMON: {
    IS_PREVIOUS_PURCHASE_ON: true,
    VISIABLE_LOTTO_TOGGLE_ON: true,
    PRICE_UNIT,
    PRICE_LIMIT,
  },
});

export default CONSTANTS;
