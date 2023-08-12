import {LOTTO_AMOUNT, LOTTO_PRICE, LottoCompany} from "./LottoCompany";


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
        it('로또 발행 개수만큼 로또를 발행시켜준다.', () => {
            expect(lottoList).toHaveLength(LOTTO_AMOUNT);
        });
    })
});