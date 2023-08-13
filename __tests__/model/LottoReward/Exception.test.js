import { ERROR_MESSAGE } from '../../../src/step1/constants/message';
import { LottoError } from '../../../src/step1/errors';
import { LottoReward } from '../../../src/step1/model';

describe('LottoReward 예외 관련 테스트', () => {
  test.each([
    {
      lottoMatchingInfo: [
        { winningCount: -1, hasBonusNumber: false },
        { winningCount: 5, hasBonusNumber: false },
        { winningCount: 3, hasBonusNumber: false },
        { winningCount: 6, hasBonusNumber: true },
        { winningCount: 4, hasBonusNumber: false },
      ],
      expectedErrorType: LottoError,
      expectedErrorMessage: ERROR_MESSAGE.INVALID_WINNING_COUNT,
    },
    {
      lottoMatchingInfo: [
        { winningCount: 7, hasBonusNumber: false },
        { winningCount: 2, hasBonusNumber: false },
        { winningCount: 3, hasBonusNumber: false },
        { winningCount: 5, hasBonusNumber: true },
        { winningCount: 6, hasBonusNumber: false },
      ],
      expectedErrorType: LottoError,
      expectedErrorMessage: ERROR_MESSAGE.INVALID_WINNING_COUNT,
    },
    {
      lottoMatchingInfo: [
        { winningCount: 'five', hasBonusNumber: false },
        { winningCount: 2, hasBonusNumber: false },
        { winningCount: 3, hasBonusNumber: false },
        { winningCount: 5, hasBonusNumber: true },
        { winningCount: 6, hasBonusNumber: false },
      ],
      expectedErrorType: LottoError,
      expectedErrorMessage: ERROR_MESSAGE.INVALID_WINNING_COUNT,
    },
  ])(
    'TestCase %#번에서 lottoResults 내 winningCount가 문제가 있기 때문에 에러가 발생한다.',
    ({ lottoMatchingInfo, expectedErrorType, expectedErrorMessage }) => {
      // given - when
      const createLottoReward = () => LottoReward.from(lottoMatchingInfo);
      // then
      expect(() => createLottoReward()).toThrow(expectedErrorType);
      expect(() => createLottoReward()).toThrow(expectedErrorMessage);
    },
  );
});
