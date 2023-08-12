import {LottoSeller} from "../LottoSeller/LottoSeller";
import {LOTTO_PRICE, LottoCompany} from "../LottoCompany/LottoCompany";
import {LottoCustomer} from "./LottoCustomer";

const PAYED_MONEY = 5000;
const ISSUED_LOTTO_AMOUNT = PAYED_MONEY/ LOTTO_PRICE;

describe('로또 구매자', () => {
    const lottoCompany = new LottoCompany(LOTTO_PRICE);
    const lottoSeller = new LottoSeller();
    lottoSeller.joinLottoCompany(lottoCompany);

    context('로또 구매자가 로또를 구매하면,', () => {
        const lottoCustomer = new LottoCustomer();
        lottoCustomer.buyLotto(lottoSeller, PAYED_MONEY);
        it('로또 구매자는 로또를 받는다.', () => {
            expect(lottoCustomer.lottoList).toHaveLength(ISSUED_LOTTO_AMOUNT);
        })
    });
})