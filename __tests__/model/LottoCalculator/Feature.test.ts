import { LottoCalculator } from '@step1/model';
import { describe, expect, test } from '@jest/globals';

describe('LottoCalculator 기능 관련 테스트', () => {
  test.each([
    {
      input: {
        winningAmount: 2_031_555_000,
        investmentAmount: 5_000,
      },
      output: {
        rateOfReturn: '40631100%',
      },
    },
    {
      input: {
        winningAmount: 5_000,
        investmentAmount: 5_000,
      },
      output: {
        rateOfReturn: '100%',
      },
    },
    {
      input: {
        winningAmount: 5_000,
        investmentAmount: 8_000,
      },
      output: {
        rateOfReturn: '62.5%',
      },
    },
    {
      input: {
        winningAmount: 60_000,
        investmentAmount: 7_000,
      },
      output: {
        rateOfReturn: '857.1%',
      },
    },
  ])(
    '투자 금액이 $input.investmentAmount원이고, 당첨 금액이 $input.winningAmount일 때 수익율은 $output.rateOfReturn이다.',
    ({ input: { investmentAmount, winningAmount }, output }) => {
      const lottoCalculator = LottoCalculator.from(winningAmount, investmentAmount);
      const rateOfReturn = lottoCalculator.calculateRateOfReturn();
      expect(rateOfReturn).toStrictEqual(output.rateOfReturn);
    },
  );
});
