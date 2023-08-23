import {Lotto} from "./Lotto.js";

const WINNING_NUMBERS = [1, 2, 3, 4, 5, 6];
const BONUS_NUMBER = 7;

const LOTTO_LIST = [
    {
        lottoNumbers: [1, 2, 3, 4, 5, 6],
        matchingCount: 6,
        bonusNumberMatch: false,
        winningRank: 1
    },
    {
        lottoNumbers: [1, 2, 3, 4, 5, 7],
        matchingCount: 5,
        bonusNumberMatch: true,
        winningRank: 2
    },
    {
        lottoNumbers: [1, 2, 3, 4, 5, 8],
        matchingCount: 5,
        bonusNumberMatch: false,
        winningRank: 3
    },
    {
        lottoNumbers: [1, 2, 3, 4, 7, 8],
        matchingCount: 4,
        bonusNumberMatch: false,
        winningRank: 4
    },
    {
        lottoNumbers: [1, 2, 3, 8, 9, 10],
        matchingCount: 3,
        bonusNumberMatch: false,
        winningRank: 5
    },
    {
        lottoNumbers: [1, 2, 8, 9, 10, 11],
        matchingCount: 2,
        bonusNumberMatch: false,
        winningRank: 0
    }
];



describe('로또', () => {
    context('로또 생성 시', () => {

    });
    context('당첨 번호와 보너스 번호가 주어졌을 때,', () => {
        LOTTO_LIST.forEach(LOTTO => {
            it(`로또 번호가 ${LOTTO.matchingCount}개 일치, 보너스 번호 일치 여부는 ${LOTTO.bonusNumberMatch}이면, ${LOTTO.winningRank}등이다.`, () => {
                const lotto = new Lotto(LOTTO.lottoNumbers);
                lotto.setWinningRank(WINNING_NUMBERS, BONUS_NUMBER);
                expect(lotto.winningRank).toEqual(LOTTO.winningRank);
            });
        })
    })
});