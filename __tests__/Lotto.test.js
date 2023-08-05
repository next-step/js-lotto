import { DEFAULT_LIMIT_LOTTO_COUNT } from '../src/step1/constants/lotto.js';
import { LottoMerchant } from '../src/step1/model/index.js';
import { isAllLottoValidRange } from './utils/index.js';

describe('로또 발행 기능 testing', () => {
  test('로또 구입 금액을 입력 시 로또 1개를 발행한다.', () => {
    const lottoMerchant = new LottoMerchant();
    const lottos = lottoMerchant.sellLotto('9000');
    expect(lottos).toHaveLength(1);
  });

  test('구매한 로또 1개의 번호는 총 6개여야 한다.', () => {
    const lottoMerchant = new LottoMerchant();
    const lottos = lottoMerchant.sellLotto('5000');
    expect(
      lottos.every((lotto) => lotto.length === DEFAULT_LIMIT_LOTTO_COUNT),
    ).toBeTruthy();
  });

  test('구매한 로또 번호는 1 ~ 45까지의 범위를 가진다.', () => {
    const lottoMerchant = new LottoMerchant();
    const lottos = lottoMerchant.sellLotto('5000');
    expect(lottos.every((lotto) => isAllLottoValidRange(lotto))).toBeTruthy();
  });
});
