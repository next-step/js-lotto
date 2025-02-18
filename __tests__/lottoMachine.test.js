import LottoMachine from "../src/domain/LottoMachine.js";

describe("LottoMachine Class 테스트", () => {
    it("로또 머신에 금액을 넣을 시 1000원 이하면 안된다.", () => {
        expect(() => new LottoMachine(800)).toThrowError(new Error(LottoMachine.MINIMUM_PRICE_MESSAGE));
    });
    
    it("1000원당 로또는 1장이다", () => {
        const lottoMachine = new LottoMachine(2000);
        expect(lottoMachine.lottos.length).toEqual(2);
    });
});