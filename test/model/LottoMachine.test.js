import {describe, it, expect} from "vitest";
import LottoMachine from "../../src/js/model/LottoMachine";

describe('LottoMachine', () => {
    it('로또 기계가 생성하는 번호는 6자리이다.', () => {
        const lottoMachine = new LottoMachine();
        expect(lottoMachine.drawLots()).toHaveLength(6);
    });
});
