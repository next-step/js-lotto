import { LottoReward } from '../../../src/step1/model';

describe('LottoReward 관련 기능 테스트', () => {
  test.each([
    {
      lottoResults: [
        [3, false],
        [4, false],
        [5, false],
        [5, true],
        [6, false],
      ],
      expected: {
        lottoResult: {
          '3개 일치 (5,000원)': 1,
          '4개 일치 (50,000원)': 1,
          '5개 일치 (1,500,000원)': 1,
          '5개 일치, 보너스 볼 일치 (30,000,000원)': 1,
          '6개 일치 (2,000,000,000원)': 1,
        },
        winningAmount: 2_031_555_000,
      },
    },
    {
      lottoResults: [
        [4, false],
        [4, false],
        [3, false],
        [4, true],
        [3, false],
      ],
      expected: {
        lottoResult: {
          '3개 일치 (5,000원)': 2,
          '4개 일치 (50,000원)': 3,
          '5개 일치 (1,500,000원)': 0,
          '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
          '6개 일치 (2,000,000,000원)': 0,
        },
        winningAmount: 160_000,
      },
    },
    {
      lottoResults: [
        [5, true],
        [5, false],
        [5, true],
        [4, false],
        [3, false],
      ],
      expected: {
        lottoResult: {
          '3개 일치 (5,000원)': 1,
          '4개 일치 (50,000원)': 1,
          '5개 일치 (1,500,000원)': 1,
          '5개 일치, 보너스 볼 일치 (30,000,000원)': 2,
          '6개 일치 (2,000,000,000원)': 0,
        },
        winningAmount: 61_555_000,
      },
    },
    {
      lottoResults: [
        [1, true],
        [0, false],
        [2, true],
      ],
      expected: {
        lottoResult: {
          '3개 일치 (5,000원)': 0,
          '4개 일치 (50,000원)': 0,
          '5개 일치 (1,500,000원)': 0,
          '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
          '6개 일치 (2,000,000,000원)': 0,
        },
        winningAmount: 0,
      },
    },
  ])('TestCase %#번에서 lottoResults를 통해 winningInfo을 얻을 수 있다.', ({ lottoResults, expected }) => {
    const lottoReward = LottoReward.fromLottoReward(lottoResults);
    const { lottoResult, winningAmount } = lottoReward.calculateWinningInfo();
    expect(lottoResult).toStrictEqual(expected.lottoResult);
    expect(winningAmount).toBe(expected.winningAmount);
  });
});
