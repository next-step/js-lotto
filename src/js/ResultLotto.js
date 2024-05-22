import {
    LOTTO_3RD_PRIZE_WINNER,
    LOTTO_4TH_PRIZE_WINNER,
    LOTTO_5TH_PRIZE_WINNER,
    LOTTO_FIRST_PRIZE_WINNER,
    LOTTO_SECOND_PRIZE_WINNER
} from '../constants';
import { countArrayResults } from '../utils';

export function writeLottoRateOfReturn(percent) {
    const rateOfReturn = document.querySelector('.rateOfReturn');
    rateOfReturn.innerText = `당신의 총 수익률은 ${percent}%입니다.`;
}

export function writeLottosResult(result) {
    const winningTags = document.querySelectorAll('.result-table tbody tr .winning');

    winningTags.forEach((td, index) => {
        td.innerText = result[index];
        index++;
    });
}

export function getLottoResults(lottoResult) {
    const conditions = [
        LOTTO_5TH_PRIZE_WINNER,
        LOTTO_4TH_PRIZE_WINNER,
        LOTTO_3RD_PRIZE_WINNER,
        LOTTO_SECOND_PRIZE_WINNER,
        LOTTO_FIRST_PRIZE_WINNER
    ];

    return conditions.map((condition) => countArrayResults(lottoResult, (item) => item.result === condition));
}
