import PrizeLotto from "../src/domain/PrizeLotto.js";
import LottoNumber from "../src/domain/LottoNumber.js";

describe("LottoConfirmation Class 테스트", () => {

    it("보너스 숫자가 1 ~ 45사이의 숫자가 아니면 예외가 발생한다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 9];
        expect(() => new PrizeLotto(prizeLotto, 46)).toThrowError(new Error(LottoNumber.LOTTO_NUM_RANGE_MESSAGE));
    });
    
    it("보너스 숫자가 당첨숫자와 중복되면 예외가 발생한다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 9];
        expect(() => new PrizeLotto(prizeLotto, 9)).toThrowError(new Error(PrizeLotto.BONUS_NUM_DUPLICATE_MESSAGE));
    });
    
    it("당첨 숫자가 1 ~ 45사이의 숫자가 아니면 예외가 발생한다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 46];
        expect(() => new PrizeLotto(prizeLotto, 40)).toThrowError(new Error(LottoNumber.LOTTO_NUM_RANGE_MESSAGE));
    });
    
    it("당첨 숫자가 중복되면 예외가 발생한다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 8];
        expect(() => new PrizeLotto(prizeLotto, 40)).toThrowError(new Error(PrizeLotto.PRIZE_LOTTO_DUPLICATE_MESSAGE));
    });
    
    it("당첨 숫자가 6개를 초과하면 예외가 발생한다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 10, 12];
        expect(() => new PrizeLotto(prizeLotto, 40)).toThrowError(new Error(PrizeLotto.LOTTO_NUM_MESSAGE));
    });
    
});