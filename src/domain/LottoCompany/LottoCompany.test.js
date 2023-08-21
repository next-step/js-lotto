import {LottoCompany} from "./LottoCompany";
import {LottoSeller} from "../LottoSeller/LottoSeller";
import {LottoCustomer} from "../LottoCustomer/LottoCustomer";
import {Lotto} from "../Lotto/Lotto";
import {DEFAULT_LOTTO_INFO} from "../../consts/lotto/lotto.const.js";
import {
    BONUS_NUMBER,
    LOTTO_CREATE_AMOUNT,
    LOTTO_NUMBERS_CREATED,
    WINNING_NUMBERS
} from "../../consts/lotto/lotto.test.const.js";

describe('로또 회사', () => {
    const lottoCompany = new LottoCompany(DEFAULT_LOTTO_INFO.PRICE, DEFAULT_LOTTO_INFO.PRIZE);

    context('로또 회사를 생성하고 나면', () => {
        it(`로또 회사에서 판매하는 로또 가격은 ${DEFAULT_LOTTO_INFO.PRICE}이다.`, () => {
            expect(lottoCompany.lottoPrice).toBe(DEFAULT_LOTTO_INFO.PRICE);
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
        const lottoList = lottoCompany.makeLottoList(lottoCustomer, LOTTO_CREATE_AMOUNT);
        it('로또 발행 개수만큼 로또를 발행한다.', () => {
            expect(lottoList).toHaveLength(LOTTO_CREATE_AMOUNT);
        });
    });

    context('로또를 발행하면', () => {
        const lottoCustomer = new LottoCustomer();
        const lottoList = LOTTO_NUMBERS_CREATED.map(lottoNumbers => new Lotto(lottoCompany, lottoCustomer, lottoNumbers));
        lottoCompany.storeLottoList(lottoList);
        it('로또 회사는 발행한 로또를 저장한다.', () => {
            expect(lottoCompany.issuedLottoList).toHaveLength(LOTTO_NUMBERS_CREATED.length);
        });
    });

    context('로또 당첨 번호를 입력받으면', () => {
        lottoCompany.checkLottoWinners(WINNING_NUMBERS, BONUS_NUMBER);
        it('로또 회사는 로또에 당첨 등수를 기록한다.', () => {
            expect(lottoCompany.issuedLottoList[0].winningRank).toBe(1);
            expect(lottoCompany.issuedLottoList[1].winningRank).toBe(2);
            expect(lottoCompany.issuedLottoList[2].winningRank).toBe(2);
            expect(lottoCompany.issuedLottoList[3].winningRank).toBe(3);
            expect(lottoCompany.issuedLottoList[4].winningRank).toBe(4);
            expect(lottoCompany.issuedLottoList[5].winningRank).toBe(5);
            expect(lottoCompany.issuedLottoList[6].winningRank).toBe(5);
            expect(lottoCompany.issuedLottoList[7].winningRank).toBe(0);
        })
    });

    context('로또 당첨 등수를 입력받으면', () => {
        it('로또 회사는 당첨금을 지급한다.', () => {
            expect(lottoCompany.getPrize(1)).toBe(DEFAULT_LOTTO_INFO.PRIZE[1]);
            expect(lottoCompany.getPrize(2)).toBe(DEFAULT_LOTTO_INFO.PRIZE[2]);
            expect(lottoCompany.getPrize(3)).toBe(DEFAULT_LOTTO_INFO.PRIZE[3]);
            expect(lottoCompany.getPrize(4)).toBe(DEFAULT_LOTTO_INFO.PRIZE[4]);
            expect(lottoCompany.getPrize(5)).toBe(DEFAULT_LOTTO_INFO.PRIZE[5]);
            expect(lottoCompany.getPrize(0)).toBe(0);
        });
    })
});