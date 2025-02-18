import LottoMachine from "../src/domain/LottoMachine.js";
import Lotto  from "../src/domain/Lotto.js";

describe("LottoMachine Class 테스트", () => {
    it("로또 머신에 금액을 넣을 시 1000원 이하면 안된다.", () => {
        expect(() => new LottoMachine(999)).toThrowError(new Error(LottoMachine.MINIMUM_PRICE_MESSAGE));
    });
    
    it("2000원 입력 시 자동 로또는 2장 생성된다.", () => {
        const lottoMachine = new LottoMachine(2000);
        lottoMachine.buyAuto();
        expect(lottoMachine.getLottos.length).toEqual(2);
    });

    it("2000원 입력 시 수동 로또는 2장을 입력받는다.", () => {
        const lottoMachine = new LottoMachine(2000);
        lottoMachine.buyManual(
            [
                new Lotto([1,2,3,4,5,6]),
                new Lotto([1,2,3,4,5,6]),
            ]
        );
        expect(lottoMachine.getLottos.length).toEqual(2);
    });

    it("2000원 입력 후 입력받은 로또가 2장이 아니면 예외가 발생한다.", () => {
        const lottoMachine = new LottoMachine(2000);
        
        expect(() => lottoMachine.buyManual(
            [
                new Lotto([1,2,3,4,5,6]),
                new Lotto([1,2,3,4,5,6]),
                new Lotto([1,2,3,4,5,6])
            ]
        )).toThrowError(new Error(lottoMachine.getLottoNum + LottoMachine.MANUAL_LOTTO_SIZE_MESSAGE));
    });
});