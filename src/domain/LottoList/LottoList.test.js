import {
    BONUS_NUMBER,
    EXPECTED_LOTTO_RESULT_SUMMARY,
    EXPECTED_PROFIT_RATE,
    LOTTO_LIST,
    WINNING_NUMBERS
} from "../../consts/Lotto.test.const.js";
import {Lotto} from "../Lotto/Lotto.js";
import {LottoList} from "./LottoList.js";

describe('로또', () => {
    const lottoInputList = LOTTO_LIST.map(LOTTO => new Lotto(LOTTO.lottoNumbers));
    const lottoList = new LottoList(lottoInputList);

    lottoList.setWinningRank(WINNING_NUMBERS, BONUS_NUMBER);
    context('로또 추첨 이후', () => {
        it('로또 추첨 결과 요약을 알 수 있다.', () => {
            expect(lottoList.getLottoResultSummary()).toEqual(EXPECTED_LOTTO_RESULT_SUMMARY);
        });
        it('로또 추첨 결과 수익률을 알 수 있다.', () => {
            expect(lottoList.getProfitRate()).toEqual(EXPECTED_PROFIT_RATE);
        });
    })
});