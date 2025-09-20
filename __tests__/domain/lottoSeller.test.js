import { LottoOperator } from '../../src/domain/lotto-operator';
import { LottoSeller } from '../../src/domain/lotto-seller'
import { LottoType } from '../../src/domain/lotto-type';

describe('로또 판매자는', () => {
    describe('판매 시', () => {
        test('받은 금액으로 최대한 살 수 있는 로또들을 반환한다.', () => {
            // given
            const lottoOperator = new LottoOperator();
            const lottoSeller = new LottoSeller(lottoOperator);

            // when
            const money = 3000;
            const lottos = lottoSeller.Sell(LottoType.SIMPLE, money);

            // then
            expect(lottos.length).toEqual(3);
        })
    })
})
