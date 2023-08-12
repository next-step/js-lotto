import {LOTTO_AMOUNT, LOTTO_PRICE, LottoCompany} from "./LottoCompany";
import {LottoSeller} from "../LottoSeller/LottoSeller";


describe('로또 회사', () => {
    const lottoCompany = new LottoCompany(LOTTO_PRICE);

    context('로또 회사를 생성하고 나면', () => {
        it(`로또 회사에서 판매하는 로또 가격은 ${LOTTO_PRICE}이다.`, () => {
            expect(lottoCompany.lottoPrice).toBe(LOTTO_PRICE);
        })
    })

    context('로또 발행 개수를 입력받으면', () => {
        const lottoCustomer = new LottoCustomer();
        const lottoList = lottoCompany.issueLotto(lottoCustomer, LOTTO_AMOUNT);
        it('로또 발행 개수만큼 로또를 발행한다.', () => {
            expect(lottoList).toHaveLength(LOTTO_AMOUNT);
        });
    });

    context('로또 회사가 로또 판매자의 가입을 받으면,', () => {
        const lottoSeller = new LottoSeller();
        lottoCompany.addSeller(lottoSeller);
        it('로또 회사는 로또 판매자를 판매자 리스트에 저장한다.', () => {
            expect(lottoCompany.sellerList).toContain(lottoSeller);
        });
    })
});