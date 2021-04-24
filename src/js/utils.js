export const getEl = (selector, parent = document) => parent.querySelector(selector);
export const getEls = (selector, parent = document) => parent.querySelectorAll(selector);

export const generateLottoNumber = () => {
    const MAX_SIZE = 6;
    const numbers = new Set();

    while (numbers.size < MAX_SIZE) {
        const number = Math.floor(Math.random() * 45) + 1;
        numbers.add(number);
    }

    return [...numbers];
};

export const checkLottos = (lottos, lottoNums) => {
    const map = new Map();
    const [bonusNum] = lottoNums.splice(6, 1);
    lottos.forEach(lotto => {
        let matcingCount = lottoNums.reduce((count, num) => {
            if (lotto.includes(num)) count++;
            return count;
        }, 0);

        if (matcingCount < 3) return;
        if (matcingCount === 5 && lotto.includes(bonusNum)) matcingCount = 5.5;
        let value = map.get(matcingCount) ?? 0;
        map.set(matcingCount, ++value);
    });
    return map;
};
