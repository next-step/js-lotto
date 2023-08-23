import {Lotto} from "./Lotto.js";
import {BONUS_NUMBER, LOTTO_LIST, WINNING_NUMBERS} from "../consts/Lotto.test.const.js";

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