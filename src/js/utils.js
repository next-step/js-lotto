import { NUMBERS } from './constants.js';

export const getEl = (selector, parent = document) => parent.querySelector(selector);
export const getEls = (selector, parent = document) => parent.querySelectorAll(selector);

export const generateLottoNums = () => {
    const numbers = new Set();

    while (numbers.size < NUMBERS.LOTTO_SIZE) {
        const number = Math.floor(Math.random() * NUMBERS.MAX_LOTTO_NUM) + NUMBERS.MIN_LOTTO_NUM;
        numbers.add(number);
    }

    return [...numbers];
};

export const checkLottos = (lottos, lottoNums) => {
    const map = new Map();
    const [bonusNum] = lottoNums.splice(NUMBERS.LOTTO_SIZE, 1);

    lottos.forEach(lotto => {
        let matcingCount = lottoNums.reduce((count, num) => {
            if (lotto.includes(num)) count++;
            return count;
        }, 0);

        if (matcingCount < 3) return;
        if (matcingCount === 5 && lotto.includes(bonusNum)) matcingCount = 5.5;
        let prizeCount = map.get(matcingCount) ?? 0;
        map.set(matcingCount + '', ++prizeCount);
    });

    return map;
};

export const calcEarningRate = (purchasedPrice, winLottos) => {
    const prizeMoney = {
        '3': 5000,
        '4': 50000,
        '5': 1500000,
        '5.5': 30000000,
        '6': 2000000000,
    };

    const totalPrizeMoney = [...winLottos].reduce((money, winLotto) => {
        const [matchingCount, count] = winLotto;
        return money + prizeMoney[matchingCount] * count;
    }, 0) - purchasedPrice;

    return (totalPrizeMoney / purchasedPrice) * 100;
};
