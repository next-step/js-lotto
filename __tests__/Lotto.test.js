import Lotto from "../src/domain/Lotto.js";

describe("Lotto Class 테스트", () => {
    it("생성한 로또번호를 가져온다.", () => {
        const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
        expect(lotto.value).toEqual([1, 2, 3, 4, 5, 6]);
    });
    
    it("로또 숫자가 중복되면 예외가 발생한다.", () => {
        const lottoNumber = [1, 2, 3, 7, 8, 8];
        expect(() => new Lotto(lottoNumber)).toThrowError(new Error(Lotto.LOTTO_DUPLICATE_MESSAGE));
    });
    
    it("로또 숫자가 6개를 초과하면 예외가 발생한다.", () => {
        const lottoNumber = [1, 2, 3, 7, 8, 10, 12];
        expect(() => new Lotto(lottoNumber)).toThrowError(new Error(Lotto.LOTTO_NUM_MESSAGE));
    });
});

