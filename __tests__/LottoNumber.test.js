import LottoNumber from "../src/domain/LottoNumber.js";

describe("LottoNumber Class 테스트", () => {
    
    it("로또 숫자가 1 ~ 45가 아니면 예외가 발생한다.", () => {
        expect(() => new LottoNumber(46)).toThrowError(new Error(LottoNumber.LOTTO_NUM_RANGE_MESSAGE));
    });

    it("생성한 로또 번호를 가져온다.", () => {
        const lottoNumber = new LottoNumber(1);
        expect(lottoNumber.lottoNumber).toEqual(1);
    });
    
});