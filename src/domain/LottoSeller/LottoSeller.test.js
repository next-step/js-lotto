import {LOTTO_AMOUNT, LOTTO_PRICE, LottoCompany} from "../LottoCompany/LottoCompany";
import {LottoSeller} from "./LottoSeller";
import {LottoCustomer} from "../LottoCustomer/LottoCustomer";

describe('로또 판매자', () => {
    const lottoCompany = new LottoCompany(LOTTO_PRICE);
    const lottoSeller = new LottoSeller();
    lottoSeller.joinLottoCompany(lottoCompany);

    context('로또 회사에 로또 발행 요청을 하면,', () => {
        const lottoCustomer = new LottoCustomer();
        const lottoList = lottoSeller.requestLotto(lottoCustomer, LOTTO_AMOUNT);
        it('로또 회사는 로또를 발행한다.', () => {
            expect(lottoList).toHaveLength(LOTTO_AMOUNT);
        });
    })
})