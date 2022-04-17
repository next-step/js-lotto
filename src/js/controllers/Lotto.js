import { NUM, PRICE_TABLE, RANKING_TABLE } from '../constants/index.js';
import { shuffle } from '../utils/index.js';

const Lotto = {
    getLotto: () => {
        const lotto = Array.from(
            { length: NUM.MAX_RANDOM },
            (value, index) => index + 1
        );
        shuffle(lotto);

        return lotto.slice(0, 6);
    },
    getMultipleLotto: (num) => {
        return Array.from({ length: num }).map(() => Lotto.getLotto());
    },
    getMachingCount: ({ lotto, winningNumberTable, bonusNumber }) => {
        let matchingCount = 0;
        let isBonusMatch = false;
        lotto.forEach((lottoNumber) => {
            const isMatch = Boolean(winningNumberTable[lottoNumber]);
            if (isMatch) {
                matchingCount += 1;
            }

            isBonusMatch = bonusNumber === lottoNumber;
        });

        return { matchingCount, isBonusMatch };
    },
    getRanking: ({ matchingCount, isBonusMatch }) => {
        const ranking = RANKING_TABLE[matchingCount];

        const isSecondPlace = ranking === 5 && isBonusMatch;
        if (isSecondPlace) return 2;

        return ranking;
    },
    getRankingTable: ({ lottos, winningNumbers, bonusNumber }) => {
        const rankingTable = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        const winningNumberTable = {};
        winningNumbers.forEach((winningNumber) => {
            winningNumberTable[winningNumber] = 1;
        });

        lottos.forEach((lotto) => {
            const { isMatchingBonus, matchingCount } = Lotto.getMachingCount({
                lotto,
                winningNumberTable,
                bonusNumber,
            });
            const ranking = Lotto.getRanking({
                isMatchingBonus,
                matchingCount,
            });

            const isValidRanking = ranking > 0;
            if (isValidRanking) {
                rankingTable[ranking] += 1;
            }
        });

        return rankingTable;
    },
    getProfit({ principal, rankingTable }) {
        let winningMoney = 0;
        Object.entries(rankingTable).forEach(([rank, count]) => {
            winningMoney += PRICE_TABLE[rank] * count;
        });

        const difference = winningMoney - principal;
        const profit = (difference / principal) * 100;

        return profit;
    },
};

export default Lotto;
