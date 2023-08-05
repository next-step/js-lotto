import {
  DEFAULT_LIMIT_LOTTO_COUNT,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from '../src/step1/constants/lotto.js';
import { LottoMerchant } from '../src/step1/model/index.js';
import { isAllLottoValidRange, isSixNumberInLotto } from './utils/index.js';

describe('로또 발행 기능 testing', () => {
  const createLottos = (amount) => {
    const lottoMerchant = new LottoMerchant();
    return lottoMerchant.sellLotto(amount);
  };
  test('로또 구입 금액을 입력 시 로또 1개를 발행한다.', () => {
    const lottos = createLottos(1000);
    expect(lottos).toHaveLength(1);
  });

  test(`구매한 로또 1개의 번호는 총 ${DEFAULT_LIMIT_LOTTO_COUNT}개여야 한다.`, () => {
    const lottos = createLottos(1000);
    expect(lottos.every((lotto) => isSixNumberInLotto(lotto))).toBeTruthy();
  });

  test(`구매한 로또 1개의 번호는 ${MIN_LOTTO_NUMBER} ~ ${MAX_LOTTO_NUMBER}까지의 범위를 가진다.`, () => {
    const lottos = createLottos(1000);
    expect(lottos.every((lotto) => isAllLottoValidRange(lotto))).toBeTruthy();
  });

  test.each([
    [3000, 3],
    [4000, 4],
    [6000, 6],
    [2000, 2],
    [8000, 8],
  ])('%i원치의 로또는 총 %i개가 생성되어야 한다.', (amount, numberOfLotto) => {
    const lottos = createLottos(amount).length;
    expect(lottos).toEqual(numberOfLotto);
  });

  test.each([
    [3, 3000],
    [4, 4000],
    [6, 6000],
    [2, 2000],
    [8, 8000],
  ])(
    `%i개의 로또 번호는 모두 ${DEFAULT_LIMIT_LOTTO_COUNT}개여야 한다.`,
    (_, amount) => {
      const lottos = createLottos(amount);
      expect(lottos.every((lotto) => isSixNumberInLotto(lotto))).toBeTruthy();
    },
  );

  test.each([
    [3, 3000],
    [4, 4000],
    [6, 6000],
    [2, 2000],
    [8, 8000],
  ])(
    `%i개의 로또 번호는 모두 ${MIN_LOTTO_NUMBER} ~ ${MAX_LOTTO_NUMBER}의 범위를 가진다.`,
    (_, amount) => {
      const lottos = createLottos(amount);
      expect(lottos.every((lotto) => isAllLottoValidRange(lotto))).toBeTruthy();
    },
  );
});
