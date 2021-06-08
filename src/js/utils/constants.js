export const MIN_WINNING_NUMBER = 1;
export const MAX_WINNING_NUMBER = 45;

export const MIN_PURCHASE_PRICE = 1000;
export const MAX_PURCHASE_PRICE = 100000;
export const LOTTO_PRICE = 1000;

export const FLEX_COL = 'flex-col';

const KEY = '5+bonus';
export const PRIZE = {
    3: 0,
    4: 0,
    5: 0,
    [KEY]: 0,
    6: 0,
};

export const PRIZE_MONEY = {
    3: 5000,
    4: 40000,
    5: 1500000,
    [KEY]: 30000000,
    6: 2000000000,
};

export const ERROR_MESSAGE = Object.freeze({
    NO_INPUT_PRICE: '로또 구입 금액을 입력해 주세요.',
    PRICE_LENGTH: '로또 구입 금액은 최소 1000원 최대 100,000원 입니다.',
    PRICE_UNIT: '로또 구입 금액을 1,000원 단위로 입력해 주세요.',
    LOTTO_NUMBER_VALID: '로또 번호는 1이상 45이하의 숫자만 입력할 수 있습니다.',
    LOTTO_NUMBER_DUPLICATE: '로또 번호에는 중복된 숫자를 입력할 수 없습니다.',
});
