import LottoConfirmation from "../src/domain/LottoConfirmation.js";
import PrizeLotto from "../src/domain/PrizeLotto.js";
import Lotto from "../src/domain/Lotto.js";

describe("LottoConfirmation Class 테스트", () => {

    let lottos;

    beforeEach(() => {
        lottos = [[1, 2, 3, 4, 5, 6]].map(lotto => new Lotto(lotto))
    });

    it.each(
        [
            {rank: 1, prizeLotto: [1, 2, 3, 4, 5, 6], bonusNumber: 30, totalPrize: 2_000_000_000},
            {rank: 2, prizeLotto: [1, 2, 3, 4, 5, 7], bonusNumber: 6, totalPrize: 30_000_000},
            {rank: 3, prizeLotto: [1, 2, 3, 4, 5, 7], bonusNumber: 30, totalPrize: 1_500_000},
            {rank: 4, prizeLotto: [1, 2, 3, 5, 8, 9], bonusNumber: 30, totalPrize: 50_000},
            {rank: 5, prizeLotto: [1, 2, 3, 7, 8, 9], bonusNumber: 30, totalPrize: 5_000},
            {rank: 6, prizeLotto: [7, 8, 9, 10, 11, 12], bonusNumber: 30, totalPrize: 0}
        ]
    )
    ("로또와 당첨숫자와 보너스 숫자를 입력받고 $rank등 일시 $totalPrize 원을 지급받는다.",
        ({prizeLotto, bonusNumber, totalPrize}) => {
            const prizeLottos = new PrizeLotto(prizeLotto, bonusNumber);
            const lottoConfirmation = new LottoConfirmation(lottos, prizeLottos);
            expect(lottoConfirmation.totalPrize).toEqual(totalPrize);
        }
    );

    it("로또 1장 구입 후 1등 당첨시에 수익률은 200000000이다", () => {
        const prizeLotto = new PrizeLotto([1, 2, 3, 4, 5, 6], 30);
        const lottoConfirmation = new LottoConfirmation(lottos, prizeLotto);
        expect(lottoConfirmation.calculateRateOfReturn()).toEqual(200_000_000);
    });

    it("로또 1장 구입 후 1등 당첨시에 로또 결과를 검증한다.", () => {
        const prizeLotto = new PrizeLotto([1, 2, 3, 4, 5, 6], 30);
        const lottoConfirmation = new LottoConfirmation(lottos, prizeLotto);

        expect(lottoConfirmation.lottoResults.get(7)).toEqual(1);
    });

});