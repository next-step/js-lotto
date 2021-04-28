import {WINNING_NUMBER_LIST, BONUS_NUMBER} from '../LottoController/InputWinningNumber.js';
import {LOTTO_NUMBER_LIST, totalPurchasedLotto, inputPrice} from '../LottoController/LottoPurchase.js';
import {PRIZE, PRIZE_MONEY} from '../utils/constants.js';
import {$matchCounts, $profit} from '../utils/doms.js';

export const prizeCounter = () => {
    for (let i = 0; i < totalPurchasedLotto; i++) {
        let count = 0;
        const lottoNumbers = LOTTO_NUMBER_LIST[i];

        lottoNumbers.map((number) => {
            if (WINNING_NUMBER_LIST.includes(number)) {
                count += 1;
            }
        });

        if (count >= 3) {
            if (count === 5 && lottoNumbers.includes(BONUS_NUMBER)) {
                PRIZE['5PLUS'] += 1;
                continue;
            }
            PRIZE[count] += 1;
        }
    }
};

export const showPrizeCount = () => {
    const list = ['3', '4', '5', '5PLUS', '6'];
    let i = 0;

    $matchCounts.forEach((matchCount) => {
        matchCount.innerText = PRIZE[list[i]];
        i += 1;
    });
};

export const showYield = () => {
    let sum = 0;
    ['3', '4', '5', '5PLUS', '6'].map((match) => {
        sum += PRIZE[match] * PRIZE_MONEY[match];
    });
    const yeild = (sum / inputPrice - 1) * 100;
    $profit.innerText = yeild;
};
