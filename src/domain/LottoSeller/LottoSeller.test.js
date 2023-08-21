import {LottoCompany} from "../LottoCompany/LottoCompany";
import {LottoSeller} from "./LottoSeller";
import {LottoCustomer} from "../LottoCustomer/LottoCustomer";
import {DEFAULT_LOTTO_INFO} from "../../consts/lotto/lotto.const.js";
import {LOTTO_CREATE_AMOUNT} from "../../consts/lotto/lotto.test.const.js";

describe('로또 판매자', () => {
    const lottoCompany = new LottoCompany(DEFAULT_LOTTO_INFO.PRICE, DEFAULT_LOTTO_INFO.PRIZE);
    const lottoSeller = new LottoSeller();
    lottoSeller.joinLottoCompany(lottoCompany);

    context('로또 회사에 로또 발행 요청을 하면,', () => {
        const lottoCustomer = new LottoCustomer();
        const lottoList = lottoSeller.requestLotto(lottoCustomer, LOTTO_CREATE_AMOUNT);
        it('로또 회사는 로또를 발행한다.', () => {
            expect(lottoList).toHaveLength(LOTTO_CREATE_AMOUNT);
        });
    })
})