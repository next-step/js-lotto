import {winningNumberList, bonusNumber} from '../LottoController/InputWinningNumber.js';
import {LOTTO_NUMBER_LIST, totalPurchasedLotto, inputPrice} from '../LottoController/LottoPurchase.js';
import {PRIZE, PRIZE_MONEY} from '../utils/constants.js';
import {$matchCounts, $profit} from '../utils/doms.js';

export const prizeCounter = () => {
    for (let i = 0; i < totalPurchasedLotto; i++) {
        let count = 0;
        const lottoNumbers = LOTTO_NUMBER_LIST[i];

        lottoNumbers.map((number) => {
            if (winningNumberList.includes(number)) {
                count += 1;
            }
        });

        if (count >= 3) {
            if (count === 5 && lottoNumbers.includes(bonusNumber)) {
                PRIZE['5+bonus'] += 1;
                continue;
            }
            PRIZE[count] += 1;
        }
    }
};

export const showPrizeCount = () => {
    const list = ['3', '4', '5', '5+bonus', '6'];
    let i = 0;

    $matchCounts.forEach((matchCount) => {
        matchCount.innerText = PRIZE[list[i]];
        i += 1;
    });
};

export const showYield = () => {
    let sum = 0;
    ['3', '4', '5', '5+bonus', '6'].map((match) => {
        sum += PRIZE[match] * PRIZE_MONEY[match];
    });

    const lottoYield = (sum / inputPrice - 1) * 100;
    $profit.innerText = lottoYield;
};
