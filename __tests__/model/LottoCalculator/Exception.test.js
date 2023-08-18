import { ERROR_MESSAGE } from '../../../src/step1/constants/message';
import { LottoError } from '../../../src/step1/errors';
import { LottoCalculator } from '../../../src/step1/model';

describe('LottoCalculator 예외 관련 테스트', () => {
  test.each([
    {
      winningAmount: 'string',
      investmentAmount: 200,
      expectedErrorType: LottoError,
      expectedErrorMessage: ERROR_MESSAGE.TYPE_OF_NUMBER,
    },
    {
      winningAmount: undefined,
      investmentAmount: 200,
      expectedErrorType: LottoError,
      expectedErrorMessage: ERROR_MESSAGE.TYPE_OF_NUMBER,
    },
    {
      winningAmount: 100,
      investmentAmount: 'string',
      expectedErrorType: LottoError,
      expectedErrorMessage: ERROR_MESSAGE.TYPE_OF_NUMBER,
    },
    {
      winningAmount: 100,
      investmentAmount: null,
      expectedErrorType: LottoError,
      expectedErrorMessage: ERROR_MESSAGE.TYPE_OF_NUMBER,
    },
    {
      winningAmount: 100,
      investmentAmount: undefined,
      expectedErrorType: LottoError,
      expectedErrorMessage: ERROR_MESSAGE.TYPE_OF_NUMBER,
    },
    {
      winningAmount: 100,
      investmentAmount: 0,
      expectedErrorType: TypeError,
      expectedErrorMessage: ERROR_MESSAGE.INVALID_AMOUNT,
    },
  ])(
    '당첨 금액이 $winningAmount이고 투자 금액이 $investmentAmount일때, $expectedErrorType.name가 발생한다.',
    ({ winningAmount, investmentAmount, expectedErrorType, expectedErrorMessage }) => {
      // given - when
      const createLottoCalculator = () => new LottoCalculator(winningAmount, investmentAmount);
      // then
      expect(() => createLottoCalculator()).toThrow(expectedErrorType);
      expect(() => createLottoCalculator()).toThrow(expectedErrorMessage);
    },
  );
});
