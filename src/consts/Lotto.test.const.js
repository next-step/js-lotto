import {LOTTO_INFO} from "./Lotto.js";

export const WINNING_NUMBERS = [1, 2, 3, 4, 5, 6];
export const BONUS_NUMBER = 7;
export const LOTTO_LIST = [
    {
        lottoNumbers: [1, 2, 3, 4, 5, 6],
        matchingCount: 6,
        bonusNumberMatch: false,
        winningRank: 1,
        prize: LOTTO_INFO.PRIZE[1]
    },
    {
        lottoNumbers: [1, 2, 3, 4, 5, 7],
        matchingCount: 5,
        bonusNumberMatch: true,
        winningRank: 2,
        prize: LOTTO_INFO.PRIZE[2]
    },
    {
        lottoNumbers: [1, 2, 3, 4, 5, 8],
        matchingCount: 5,
        bonusNumberMatch: false,
        winningRank: 3,
        prize: LOTTO_INFO.PRIZE[3]
    },
    {
        lottoNumbers: [1, 2, 3, 4, 8, 9],
        matchingCount: 4,
        bonusNumberMatch: false,
        winningRank: 4,
        prize: LOTTO_INFO.PRIZE[4]
    },
    {
        lottoNumbers: [1, 2, 3, 8, 9, 10],
        matchingCount: 3,
        bonusNumberMatch: false,
        winningRank: 5,
        prize: LOTTO_INFO.PRIZE[5]
    },
    {
        lottoNumbers: [1, 2, 8, 9, 10, 11],
        matchingCount: 2,
        bonusNumberMatch: false,
        winningRank: 0,
        prize: 0
    }];

export const EXPECTED_LOTTO_RESULT_SUMMARY = LOTTO_INFO.WINNING_CONDITION.map((CONDITION) => ({
    match: CONDITION.MATCH,
    bonus: CONDITION.BONUS,
    count: LOTTO_LIST.filter(lotto => lotto.winningRank === CONDITION.RANK).length,
    rank: CONDITION.RANK
}));

const EXPECTED_TOTAL_PRIZE = LOTTO_LIST.reduce((acc, lotto) => acc + lotto.prize, 0);
const EXPECTED_TOTAL_INPUT = LOTTO_LIST.length * LOTTO_INFO.PRICE;
export const EXPECTED_PROFIT_RATE = EXPECTED_TOTAL_PRIZE / EXPECTED_TOTAL_INPUT * 100;