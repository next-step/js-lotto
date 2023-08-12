import { ERROR_MESSAGE } from '../../../src/step1/constants/message';
import { LottoError } from '../../../src/step1/errors';
import { LottoReward } from '../../../src/step1/model';

describe('LottoReward 예외 관련 테스트', () => {
  test.each([
    {
      lottoResults: [
        [-1, false],
        [5, true],
        [3, false],
        [6, true],
        [4, false],
      ],
      expectedErrorType: LottoError,
      expectedErrorMessage: ERROR_MESSAGE.INVALID_WINNING_COUNT,
    },
    {
      lottoResults: [
        [7, true],
        [2, true],
        [3, false],
        [5, true],
        [6, false],
      ],
      expectedErrorType: LottoError,
      expectedErrorMessage: ERROR_MESSAGE.INVALID_WINNING_COUNT,
    },
    {
      lottoResults: [
        ['five', true],
        [4, false],
        [2, false],
        [6, true],
        [5, true],
      ],
      expectedErrorType: LottoError,
      expectedErrorMessage: ERROR_MESSAGE.INVALID_WINNING_COUNT,
    },
  ])(
    'TestCase %#번에서 lottoResults 내 winningCount가 문제가 있기 때문에 에러가 발생한다.',
    ({ lottoResults, expectedErrorType, expectedErrorMessage }) => {
      // given - when
      const createLottoReward = () => LottoReward.fromLottoReward(lottoResults);
      // then
      expect(() => createLottoReward()).toThrow(expectedErrorType);
      expect(() => createLottoReward()).toThrow(expectedErrorMessage);
    },
  );
});
