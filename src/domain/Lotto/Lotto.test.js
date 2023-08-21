import {Lotto} from "./Lotto";
import {LottoCompany} from "../LottoCompany/LottoCompany";
import {LottoCustomer} from "../LottoCustomer/LottoCustomer";
import {DEFAULT_LOTTO_INFO} from "../../consts/lotto/lotto.const.js";
import {LOTTO_NUMBERS_CREATED} from "../../consts/lotto/lotto.test.const.js";

describe('로또', () => {
    const lottoCompany = new LottoCompany(DEFAULT_LOTTO_INFO.PRICE, DEFAULT_LOTTO_INFO.PRIZE);
    const lottoCustomer = new LottoCustomer();


    context('로또 생성을 하면', () => {
        const lotto = new Lotto(lottoCompany, lottoCustomer, LOTTO_NUMBERS_CREATED[0]);
        it('로또에 회사정보, 구매자 정보, 로또 번호가 저장된다.', () => {
            expect(lotto.lottoCompany).toEqual(lottoCompany);
            expect(lotto.lottoCustomer).toEqual(lottoCustomer);
            expect(lotto.lottoNumbers).toEqual(LOTTO_NUMBERS_CREATED[0]);
        });
    });
});