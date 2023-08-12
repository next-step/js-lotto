import {LOTTO_AMOUNT, LOTTO_PRICE, LottoCompany} from "../LottoCompany/LottoCompany";
import {LottoSeller} from "./LottoSeller";

describe('로또 판매자', () => {
    const lottoCompany = new LottoCompany(LOTTO_PRICE);
    const lottoSeller = new LottoSeller();

    context('로또 회사에 가입하고 나면,', () => {
        lottoSeller.joinLottoCompany(lottoCompany);
      it('로또 회사에 로또 가격을 물어볼 수 있다.', () => {
        expect(lottoSeller.askLottoPrice()).toBe(LOTTO_PRICE);
      })
    })

    context('로또 회사에 로또 발행 요청을 하면,', () => {
        const lottoCustomer = new LottoCustomer();
        const lottoList = lottoSeller.requestLotto(lottoCustomer, LOTTO_AMOUNT);
        it('로또 회사는 로또를 발행한다.', () => {
            expect(lottoList).toHaveLength(LOTTO_AMOUNT);
        });
    })
})