import PrizeLotto from "../src/domain/PrizeLotto.js";
import LottoNumber from "../src/domain/LottoNumber.js";

describe("LottoConfirmation Class 테스트", () => {

    it("PrizeLotto를 생성한다.", () => {
        const prizeLotto = new PrizeLotto([1, 2, 3, 7, 8, 9], 45);
        expect(prizeLotto.value).toEqual([1, 2, 3, 7, 8, 9]);
        expect(prizeLotto.bonusNumber).toEqual(45);
    });

    it("보너스 숫자가 1 ~ 45사이의 숫자가 아니면 예외가 발생한다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 9];
        expect(() => new PrizeLotto(prizeLotto, 46)).toThrowError(new Error(LottoNumber.LOTTO_NUM_RANGE_MESSAGE));
    });
    
    it("보너스 숫자가 당첨숫자와 중복되면 예외가 발생한다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 9];
        expect(() => new PrizeLotto(prizeLotto, 9)).toThrowError(new Error(PrizeLotto.BONUS_NUM_DUPLICATE_MESSAGE));
    });
    
});