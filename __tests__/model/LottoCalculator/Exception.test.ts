import { ERROR_MESSAGE } from '@step1/constants/message';
import { LottoCalculator } from '@step1/model';

describe('LottoCalculator 예외 관련 테스트', () => {
  test.each([
    {
      winningAmount: 100,
      investmentAmount: 0,
      expectedErrorType: TypeError,
      expectedErrorMessage: ERROR_MESSAGE.INVALID_NUMBER(0),
    },
  ])(
    '당첨 금액이 $winningAmount이고 투자 금액이 $investmentAmount일때, $expectedErrorType.name가 발생한다.',
    ({ winningAmount, investmentAmount, expectedErrorType, expectedErrorMessage }) => {
      // given - when
      const createLottoCalculator = () => LottoCalculator.from(winningAmount, investmentAmount);
      // then
      expect(() => createLottoCalculator()).toThrow(expectedErrorType);
      expect(() => createLottoCalculator()).toThrow(expectedErrorMessage);
    },
  );
});
