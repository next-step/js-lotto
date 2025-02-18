import LottoConfirmation from "../src/domain/LottoConfirmation";
import PrizeLotto from "../src/domain/PrizeLotto";

describe("LottoConfirmation Class 테스트", () => {

    let lottos;

    beforeEach(() => {
        lottos = [{ lottoNumbers: [1, 2, 3, 4, 5, 6] }];
    });

    test.each([
        [[1, 2, 3, 4, 5, 6], 30, 2000000000],
        [[1, 2, 3, 4, 5, 7], 6, 30000000],
        [[1, 2, 3, 4, 5, 7], 30, 1500000],
        [[1, 2, 3, 5, 8, 9], 30, 50000],
        [[1, 2, 3, 7, 8, 9], 30, 5000],
    ])("로또와 당첨숫자를 입력받고, %i 개수로 %i 원을 지급받는다.",
        (prizeLottoNumbers, winningCount, expectedPrize) => {
            const prizeLotto = new PrizeLotto(prizeLottoNumbers, winningCount);
            const lottoConfirmation = new LottoConfirmation(lottos, prizeLotto);
            expect(lottoConfirmation.getTotalPrize).toEqual(expectedPrize);
        });

});