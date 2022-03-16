import {describe, it, expect} from "vitest";
import User from "../../src/js/model/User";
import LottoMachine from "../../src/js/model/LottoMachine";
import LottoSeller from "../../src/js/model/LottoSeller";

describe('User', () => {
    it('유저는 가지고 있는 금액만큼 로또를 구매할 수 있다', () => {
        const user = new User();
        const sellerStub = new LottoSeller()
        const machineStub = new LottoMachine()

        user.wallet = 2000;
        expect(user.buyLotto(sellerStub, machineStub)).toHaveLength(2);
    });
});
