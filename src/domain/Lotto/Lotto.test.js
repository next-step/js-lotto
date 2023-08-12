import {Lotto} from "./Lotto";
import {LOTTO_PRICE, LottoCompany} from "../LottoCompany/LottoCompany";
import {LottoCustomer} from "../LottoCustomer/LottoCustomer";

const LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];

describe('로또', () => {
    const lottoCompany = new LottoCompany(LOTTO_PRICE);
    const lottoCustomer = new LottoCustomer();


    context('로또 생성을 하면', () => {
        const lotto = new Lotto(lottoCompany, lottoCustomer, LOTTO_NUMBERS);
        it('로또에 회사정보, 구매자 정보, 로또 번호가 저장된다.', () => {
            expect(lotto.lottoCompany).toEqual(lottoCompany);
            expect(lotto.lottoCustomer).toEqual(lottoCustomer);
            expect(lotto.lottoNumbers).toEqual(LOTTO_NUMBERS);
        });
    });
});