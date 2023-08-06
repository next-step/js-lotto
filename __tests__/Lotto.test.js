import { DEFAULT_LIMIT_LOTTO_COUNT, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../src/step1/constants/lotto.js';
import { LottoCalculator, LottoMerchant } from '../src/step1/model/index.js';
import {
  ONE_LOTTO_RATE_OF_RETURNS_TEST_CASE,
  ONE_LOTTO_WINNING_RESULT_TEST_CASE,
} from './constants/winningLottoFeature.js';
import { isAllLottoValidRange, isSixNumberInLotto } from './utils/createLottoFeature.js';

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
  ])(`%i개의 로또 번호는 모두 ${DEFAULT_LIMIT_LOTTO_COUNT}개여야 한다.`, (_, amount) => {
    const lottos = createLottos(amount);
    expect(lottos.every((lotto) => isSixNumberInLotto(lotto))).toBeTruthy();
  });

  test.each([
    [3, 3000],
    [4, 4000],
    [6, 6000],
    [2, 2000],
    [8, 8000],
  ])(`%i개의 로또 번호는 모두 ${MIN_LOTTO_NUMBER} ~ ${MAX_LOTTO_NUMBER}의 범위를 가진다.`, (_, amount) => {
    const lottos = createLottos(amount);
    expect(lottos.every((lotto) => isAllLottoValidRange(lotto))).toBeTruthy();
  });
});

describe('로또 당첨 기능 testing', () => {
  const createLotto = (params) => {
    const calculator = new LottoCalculator();
    const [lottoResult, rateOfReturn] = calculator.calculateResult(params);
    return [lottoResult, rateOfReturn];
  };
  test.each(ONE_LOTTO_WINNING_RESULT_TEST_CASE)('로또 1개의 당첨 결과는 %s와 같다', (result, params) => {
    const [lottoResult] = createLotto(params);
    expect(lottoResult).toStrictEqual(result);
  });

  test.each(ONE_LOTTO_WINNING_RESULT_TEST_CASE)('로또 1개의 당첨 갯수는 1개 이다.', (_, params) => {
    const [lottoResult] = createLotto(params);
    const winningSum = Object.values(lottoResult).reduce((acc, cur) => acc + cur, 0);
    expect(winningSum).toBe(1);
  });

  test.each(ONE_LOTTO_RATE_OF_RETURNS_TEST_CASE)('로또 1개의 수익률은 %i% 이다.', (rateOfReturn, params) => {
    const [, _rateOfReturn] = createLotto(params);
    expect(_rateOfReturn === rateOfReturn).toBeTruthy();
  });
});
