import {describe, it, expect} from "vitest";
import User from "../../src/js/model/User.mjs";

describe('User', () => {
    it('유저는 가지고 있는 금액만큼 로또를 구매할 수 있다', () => {
        const user = new User();

        user.wallet = 2000;
        expect(user.buyLotto()).toHaveLength(2);
    });
});
