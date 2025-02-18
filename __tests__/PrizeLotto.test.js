import PrizeLotto from "../src/domain/PrizeLotto";

describe("LottoConfirmation Class 테스트", () => {

    it("보너스 숫자는 1 ~ 45사이의 숫자 이여야 한다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 9];
        expect(() => new PrizeLotto(prizeLotto, 46)).toThrowError(new Error(PrizeLotto.LOTTO_NUM_RANGE_MESSAGE));
    });
    
    it("보너스 숫자는 당첨숫자와 중복되면 안된다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 9];
        expect(() => new PrizeLotto(prizeLotto, 9)).toThrowError(new Error(PrizeLotto.BONUS_NUM_DUPLICATE_MESSAGE));
    });
    
    it("당첨 숫자는 1 ~ 45사이의 숫자 이여야 한다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 46];
        expect(() => new PrizeLotto(prizeLotto, 40)).toThrowError(new Error(PrizeLotto.LOTTO_NUM_RANGE_MESSAGE));
    });
    
    it("당첨 숫자는 중복되면 안된다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 8];
        expect(() => new PrizeLotto(prizeLotto, 40)).toThrowError(new Error(PrizeLotto.PRIZE_LOTTO_DUPLICATE_MESSAGE));
    });
    
    it("당첨 숫자는 6개 이여야 합니다..", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 10, 12];
        expect(() => new PrizeLotto(prizeLotto, 40)).toThrowError(new Error(PrizeLotto.LOTTO_NUM_MESSAGE));
    });
    
});