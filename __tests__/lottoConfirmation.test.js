import LottoConfirmation from "../src/domain/lottoConfirmation";

describe("LottoConfirmation Class 테스트", () => {

    let lottos;

    beforeEach(() => {
        lottos = [{ lottoNumbers: [1, 2, 3, 4, 5, 6] }];
    });

    it("로또와 당첨숫자를 입력받고, 1등 일시 2000000000원을 지급받는다.", () => {
        const prizeLotto = [1, 2, 3, 4, 5, 6];
        const lottoConfirmation = new LottoConfirmation(lottos, prizeLotto, 30);
        expect(lottoConfirmation.getTotalPrize).toEqual(2000000000);
    });

    it("로또와 당첨숫자를 입력받고, 2등 일시 30000000원을 지급받는다.", () => {
        const prizeLotto = [1, 2, 3, 4, 5, 7];
        const lottoConfirmation = new LottoConfirmation(lottos, prizeLotto, 6);
        expect(lottoConfirmation.getTotalPrize).toEqual(30000000);
    });

    it("로또와 당첨숫자를 입력받고, 3등 일시 1500000원을 지급받는다.", () => {
        const prizeLotto = [1, 2, 3, 4, 5, 7];
        const lottoConfirmation = new LottoConfirmation(lottos, prizeLotto, 30);
        expect(lottoConfirmation.getTotalPrize).toEqual(1500000);
    });

    it("로또와 당첨숫자를 입력받고, 4등 일시 50000원을 지급받는다.", () => {
        const prizeLotto = [1, 2, 3, 4, 8, 9];
        const lottoConfirmation = new LottoConfirmation(lottos, prizeLotto, 30);
        expect(lottoConfirmation.getTotalPrize).toEqual(50000);
    });

    it("로또와 당첨숫자를 입력받고, 5등 일시 50000원을 지급받는다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 9];
        const lottoConfirmation = new LottoConfirmation(lottos, prizeLotto, 30);
        expect(lottoConfirmation.getTotalPrize).toEqual(5000);
    });

    it("보너스 숫자는 1 ~ 45사이의 숫자 이여야 한다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 9];
        expect(() => new LottoConfirmation(lottos, prizeLotto, 46)).toThrowError(new Error(LottoConfirmation.LOTTO_NUM_RANGE_MESSAGE));
    });

    it("보너스 숫자는 당첨숫자와 중복되면 안된다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 9];
        expect(() => new LottoConfirmation(lottos, prizeLotto, 9)).toThrowError(new Error(LottoConfirmation.BONUS_NUM_DUPLICATE_MESSAGE));
    });

    it("당첨 숫자는 1 ~ 45사이의 숫자 이여야 한다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 46];
        expect(() => new LottoConfirmation(lottos, prizeLotto, 40)).toThrowError(new Error(LottoConfirmation.LOTTO_NUM_RANGE_MESSAGE));
    });

    it("당첨 숫자는 중복되면 안된다.", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 8];
        expect(() => new LottoConfirmation(lottos, prizeLotto, 40)).toThrowError(new Error(LottoConfirmation.PRIZE_LOTTO_DUPLICATE_MESSAGE));
    });

    it("당첨 숫자는 6개 이여야 합니다..", () => {
        const prizeLotto = [1, 2, 3, 7, 8, 10, 12];
        expect(() => new LottoConfirmation(lottos, prizeLotto, 40)).toThrowError(new Error(LottoConfirmation.LOTTO_NUM_MESSAGE));
    });
    
});