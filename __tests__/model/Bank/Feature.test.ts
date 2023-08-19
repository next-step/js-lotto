import { Bank } from '@step1/model';

describe('Bank 관련 기능 테스트', () => {
  test.each([
    {
      inputs: {
        winningLottoNumbers: [1, 22, 16, 24, 33, 26],
        lottoNumbers: [
          [1, 22, 16, 10, 12, 11],
          [1, 22, 16, 24, 44, 12],
          [1, 22, 16, 24, 33, 12],
          [1, 22, 16, 24, 33, 5],
          [1, 22, 16, 24, 33, 26],
        ],
        bonusNumber: 5,
        investmentAmounts: 5000,
      },
      expected: {
        rateOfReturn: '40631100%',
        lottoResult: {
          '3개 일치 (5,000원)': 1,
          '4개 일치 (50,000원)': 1,
          '5개 일치 (1,500,000원)': 1,
          '5개 일치, 보너스 볼 일치 (30,000,000원)': 1,
          '6개 일치 (2,000,000,000원)': 1,
        },
      },
    },
    {
      inputs: {
        winningLottoNumbers: [1, 22, 16, 24, 33, 26],
        lottoNumbers: [
          [1, 22, 16, 10, 12, 11],
          [1, 22, 16, 21, 33, 12],
          [3, 22, 5, 24, 23, 12],
          [8, 22, 16, 10, 12, 26],
          [6, 12, 16, 24, 33, 13],
        ],
        bonusNumber: 5,
        investmentAmounts: 5000,
      },
      expected: {
        rateOfReturn: '1300%',
        lottoResult: {
          '3개 일치 (5,000원)': 3,
          '4개 일치 (50,000원)': 1,
          '5개 일치 (1,500,000원)': 0,
          '5개 일치, 보너스 볼 일치 (30,000,000원)': 0,
          '6개 일치 (2,000,000,000원)': 0,
        },
      },
    },
  ])(
    'calculateResults를 통해 얻은 수익률은 $expected.rateOfReturn이며 lottoResult는 $expected.lottoResult이다.',
    ({ inputs: { winningLottoNumbers, lottoNumbers, bonusNumber, investmentAmounts }, expected }) => {
      // given
      const bank = Bank.from(winningLottoNumbers, bonusNumber);
      // when
      const { rateOfReturn, lottoResult } = bank.calculateResults(lottoNumbers, investmentAmounts);
      // then
      expect(rateOfReturn).toStrictEqual(expected.rateOfReturn);
      expect(lottoResult).toStrictEqual(expected.lottoResult);
    },
  );
});
