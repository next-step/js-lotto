import {describe, it, expect} from "vitest";
import LottoSeller from "../../src/js/model/LottoSeller";

describe('LottoSeller', () => {
    describe('지불한 금액만큼만 로또를 팔 수 있다', () => {
        const lottoSeller = new LottoSeller();
        it('1000원 미만 금액은 로또를 0개 팔 수 있다', () => {
            expect(lottoSeller.calculateLotto(100)).to.be.equal(0);
        });
        it('3000원 금액은 로또를 3개 팔 수 있다', () => {
            expect(lottoSeller.calculateLotto(3000)).to.be.equal(3);
        });
    });
});
