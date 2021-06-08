import {
    MIN_WINNING_NUMBER,
    MAX_WINNING_NUMBER,
    MIN_PURCHASE_PRICE,
    MAX_PURCHASE_PRICE,
    LOTTO_PRICE,
    ERROR_MESSAGE,
} from '../utils/constants.js';

export const checkDuplicates = (list) => {
    return new Set(list).size != list.length;
};

export const checkValidNumber = (number) => {
    return number === '' || number < MIN_WINNING_NUMBER || number > MAX_WINNING_NUMBER;
};

export const checkInputPrice = (inputPrice) => {
    if (!inputPrice) return alert(ERROR_MESSAGE.NO_INPUT_PRICE);
    if (inputPrice < MIN_PURCHASE_PRICE || inputPrice > MAX_PURCHASE_PRICE) return alert(ERROR_MESSAGE.PRICE_LENGTH);
    if (inputPrice % LOTTO_PRICE !== 0) return alert(ERROR_MESSAGE.PRICE_UNIT);
};
