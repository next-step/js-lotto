import { LottoReward } from '../../../src/step1/model';

describe('LottoReward 관련 기능 테스트', () => {
  test.each([
    {
      description: '모든 당첨 기준에 부합하는 case',
      lottoMatchingInfo: [
        { winningCount: 3, hasBonusNumber: false },
        { winningCount: 4, hasBonusNumber: false },
        { winningCount: 5, hasBonusNumber: false },
        { winningCount: 5, hasBonusNumber: true },
        { winningCount: 6, hasBonusNumber: false },
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
      description: '5개(보너스)일치가 2번, 5개 일치가 1번, 4개 일치가 1번, 3개 일치가 1번인 case',
      lottoMatchingInfo: [
        { winningCount: 5, hasBonusNumber: true },
        { winningCount: 5, hasBonusNumber: true },
        { winningCount: 5, hasBonusNumber: false },
        { winningCount: 4, hasBonusNumber: true },
        { winningCount: 3, hasBonusNumber: false },
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
      description: '당첨이 없는 case',
      lottoMatchingInfo: [
        { winningCount: 1, hasBonusNumber: true },
        { winningCount: 0, hasBonusNumber: false },
        { winningCount: 2, hasBonusNumber: true },
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
  ])(
    '$description에서 당첨 결과는 $expected.lottoResult이며 당첨 금액은 $expected.winningAmount원이다.',
    ({ lottoMatchingInfo, expected }) => {
      const lottoReward = LottoReward.from(lottoMatchingInfo);
      const { lottoResult, winningAmount } = lottoReward.calculateWinningInfo();
      expect(lottoResult).toStrictEqual(expected.lottoResult);
      expect(winningAmount).toBe(expected.winningAmount);
    },
  );
});
