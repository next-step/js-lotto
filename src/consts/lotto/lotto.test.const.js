import {DEFAULT_LOTTO_INFO} from "./lotto.const.js";

export const LOTTO_PAYED = DEFAULT_LOTTO_INFO.PRICE * 8;
export const LOTTO_CREATE_AMOUNT = LOTTO_PAYED / DEFAULT_LOTTO_INFO.PRICE;
export const WINNING_NUMBERS = [1, 2, 3, 4, 5, 6];
export const BONUS_NUMBER = 7;
export const LOTTO_NUMBERS_CREATED = [
    [1, 2, 3, 4, 5, 6], //1등
    [1, 2, 3, 4, 5, 7], //2등
    [1, 2, 3, 5, 6, 7], //2등
    [1, 2, 3, 4, 5, 8], //3등
    [1, 2, 3, 4, 7, 8], //4등
    [1, 2, 3, 8, 9, 10], //5등
    [1, 2, 3, 9, 10, 11], //5등
    [1, 2, 8, 9, 10, 11], //꽝
]

export const EXPECTED_TOTAL_PRIZE = LOTTO_NUMBERS_CREATED.reduce((acc, lottoNumbers) => {
    const winningNumberMatchSize = WINNING_NUMBERS.filter(number => lottoNumbers.includes(number)).length;
    const bonusNumberMatch = lottoNumbers.includes(BONUS_NUMBER);
    if(winningNumberMatchSize === 6) {
        return acc + DEFAULT_LOTTO_INFO.PRIZE[1];
    }
    if(winningNumberMatchSize === 5 && bonusNumberMatch) {
        return acc + DEFAULT_LOTTO_INFO.PRIZE[2];
    }
    if(winningNumberMatchSize === 5) {
        return acc + DEFAULT_LOTTO_INFO.PRIZE[3];
    }
    if(winningNumberMatchSize === 4) {
        return acc + DEFAULT_LOTTO_INFO.PRIZE[4];
    }
    if(winningNumberMatchSize === 3) {
        return acc + DEFAULT_LOTTO_INFO.PRIZE[5];
    }
    return acc;
}, 0);
