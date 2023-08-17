import {DEFAULT_LOTTO_PRIZE, LOTTO_AMOUNT, LOTTO_PRICE, LottoCompany} from "./LottoCompany";
import {LottoSeller} from "../LottoSeller/LottoSeller";
import {LottoCustomer} from "../LottoCustomer/LottoCustomer";
import {Lotto} from "../Lotto/Lotto";

export const WINNER_NUMBERS = [1, 2, 3, 4, 5, 6];
export const BONUS_NUMBER = 7;
export const LOTTO_LIST = [
    [1, 2, 3, 4, 5, 6], //1등
    [1, 2, 3, 4, 5, 7], //2등
    [1, 2, 3, 4, 5, 8], //3등
    [1, 2, 3, 4, 7, 8], //4등
    [1, 2, 3, 7, 8, 9], //5등
    [1, 2, 8, 9, 10, 11], //꽝
]

export const EXPECTED_TOTAL_PRIZE = DEFAULT_LOTTO_PRIZE[1] + DEFAULT_LOTTO_PRIZE[2] + DEFAULT_LOTTO_PRIZE[3] + DEFAULT_LOTTO_PRIZE[4] + DEFAULT_LOTTO_PRIZE[5];

describe('로또 회사', () => {
    const lottoCompany = new LottoCompany(LOTTO_PRICE);

    context('로또 회사를 생성하고 나면', () => {
        it(`로또 회사에서 판매하는 로또 가격은 ${LOTTO_PRICE}이다.`, () => {
            expect(lottoCompany.lottoPrice).toBe(LOTTO_PRICE);
        })
    })

    context('로또 회사가 로또 판매자의 가입을 받으면,', () => {
        const lottoSeller = new LottoSeller();
        lottoCompany.addSeller(lottoSeller);
        it('로또 회사는 로또 판매자를 판매자 리스트에 저장한다.', () => {
            expect(lottoCompany.sellerList).toContain(lottoSeller);
        });
    })

    context('로또 발행 개수를 입력받으면', () => {
        const lottoCustomer = new LottoCustomer();
        const lottoList = lottoCompany.makeLottoList(lottoCustomer, LOTTO_AMOUNT);
        it('로또 발행 개수만큼 로또를 발행한다.', () => {
            expect(lottoList).toHaveLength(LOTTO_AMOUNT);
        });
    });

    context('로또를 발행하면', () => {
        const lottoCustomer = new LottoCustomer();
        const lottoList = LOTTO_LIST.map(lottoNumbers => new Lotto(lottoCompany, lottoCustomer, lottoNumbers));
        lottoCompany.storeLottoList(lottoList);
        it('로또 회사는 발행한 로또를 저장한다.', () => {
            expect(lottoCompany.issuedLottoList).toHaveLength(LOTTO_LIST.length);
        });
    });

    context('로또 당첨 번호를 입력받으면', () => {
        lottoCompany.checkLottoWinners(WINNER_NUMBERS, BONUS_NUMBER);
        it('로또 회사는 로또에 당첨 등수를 기록한다.', () => {
            expect(lottoCompany.issuedLottoList[0].winningRank).toBe(1);
            expect(lottoCompany.issuedLottoList[1].winningRank).toBe(2);
            expect(lottoCompany.issuedLottoList[2].winningRank).toBe(3);
            expect(lottoCompany.issuedLottoList[3].winningRank).toBe(4);
            expect(lottoCompany.issuedLottoList[4].winningRank).toBe(5);
            expect(lottoCompany.issuedLottoList[5].winningRank).toBe(0);
        })
    });

    context('로또 당첨 등수를 입력받으면', () => {
        it('로또 회사는 당첨금을 지급한다.', () => {
            expect(lottoCompany.getPrize(1)).toBe(DEFAULT_LOTTO_PRIZE[1]);
            expect(lottoCompany.getPrize(2)).toBe(DEFAULT_LOTTO_PRIZE[2]);
            expect(lottoCompany.getPrize(3)).toBe(DEFAULT_LOTTO_PRIZE[3]);
            expect(lottoCompany.getPrize(4)).toBe(DEFAULT_LOTTO_PRIZE[4]);
            expect(lottoCompany.getPrize(5)).toBe(DEFAULT_LOTTO_PRIZE[5]);
            expect(lottoCompany.getPrize(0)).toBe(0);
        });
    })
});