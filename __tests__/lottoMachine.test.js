import LottoMachine from "../src/domain/LottoMachine.js";

describe("LottoMachine Class 테스트", () => {
    it("로또 머신에 금액을 넣을 시 1000원 이하면 안된다.", () => {
        expect(() => new LottoMachine(999)).toThrowError(new Error(LottoMachine.MINIMUM_PRICE_MESSAGE));
    });
    
    it("2000원 입력 시 로또는 2장 생성된다.", () => {
        const lottoMachine = new LottoMachine(2000);
        expect(lottoMachine.lottos.length).toEqual(2);
    });
});