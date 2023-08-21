import {LottoSeller} from "../LottoSeller/LottoSeller";
import {LottoCompany} from "../LottoCompany/LottoCompany";
import {LottoCustomer} from "./LottoCustomer";
import {Lotto} from "../Lotto/Lotto";
import {DEFAULT_LOTTO_INFO} from "../../consts/lotto/lotto.const.js";
import {
    BONUS_NUMBER, EXPECTED_TOTAL_PRIZE,
    LOTTO_CREATE_AMOUNT,
    LOTTO_NUMBERS_CREATED,
    LOTTO_PAYED,
    WINNING_NUMBERS
} from "../../consts/lotto/lotto.test.const.js";

describe('로또 구매자', () => {
    const lottoCompany = new LottoCompany(DEFAULT_LOTTO_INFO.PRICE, DEFAULT_LOTTO_INFO.PRIZE);
    const lottoSeller = new LottoSeller();
    lottoSeller.joinLottoCompany(lottoCompany);

    context('로또 구매자가 로또를 구매하면,', () => {
        const lottoCustomer = new LottoCustomer();
        lottoCustomer.buyLotto(lottoSeller, LOTTO_PAYED);
        it('로또 구매자는 로또를 받는다.', () => {
            expect(lottoCustomer.lottoList).toHaveLength(LOTTO_CREATE_AMOUNT);
        })
    });

    context('로또 당첨 결과가 나오면', () => {
        const lottoCustomer = new LottoCustomer();
        const lottoList = LOTTO_NUMBERS_CREATED.map(lottoNumbers => new Lotto(lottoCompany, lottoCustomer, lottoNumbers));
        lottoCompany.storeLottoList(lottoList);
        lottoCustomer.addNewLottoList(lottoList);
        lottoCompany.checkLottoWinners(WINNING_NUMBERS, BONUS_NUMBER);
        it('로또 구매자는 당첨 결과를 확인할 수 있다.', () => {
            expect(lottoCustomer.lottoList[0].winningRank).toBe(1);
            expect(lottoCustomer.lottoList[1].winningRank).toBe(2);
            expect(lottoCustomer.lottoList[2].winningRank).toBe(2);
            expect(lottoCustomer.lottoList[3].winningRank).toBe(3);
            expect(lottoCustomer.lottoList[4].winningRank).toBe(4);
            expect(lottoCustomer.lottoList[5].winningRank).toBe(5);
            expect(lottoCustomer.lottoList[6].winningRank).toBe(5);
            expect(lottoCustomer.lottoList[7].winningRank).toBe(0);
        });

        it('로또 구매자는 몇개가 몇등 당첨 되었는지 알 수 있다.', () => {
            expect(lottoCustomer.getWinnerCount(1)).toBe(1);
            expect(lottoCustomer.getWinnerCount(2)).toBe(2);
            expect(lottoCustomer.getWinnerCount(3)).toBe(1);
            expect(lottoCustomer.getWinnerCount(4)).toBe(1);
            expect(lottoCustomer.getWinnerCount(5)).toBe(2);
            expect(lottoCustomer.getWinnerCount(0)).toBe(1);
        });

        it('로또 구매자는 수익률을 알 수 있다.', () => {
            const expectedProfitRate = EXPECTED_TOTAL_PRIZE / (LOTTO_NUMBERS_CREATED.length * DEFAULT_LOTTO_INFO.PRICE) * 100;
            expect(lottoCustomer.getProfitRate()).toBe(expectedProfitRate);
        });
    })
})