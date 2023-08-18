import { LOTTO_TERMS } from '../../../src/step1/constants/lotto';
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
      description: `winningCount 내 ${LOTTO_TERMS.MIN_WINNING_COUNT}보다 작은 값(-1)이 존재`,
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
      description: `winningCount 내 ${LOTTO_TERMS.MAX_WINNING_COUNT}보다 큰 값(7)이 존재`,
      expectedErrorType: LottoError,
      expectedErrorMessage: ERROR_MESSAGE.INVALID_WINNING_COUNT,
    },
  ])(
    '$description의 이유로 인해 $expectedErrorType.name가 발생한다.',
    ({ lottoMatchingInfo, expectedErrorType, expectedErrorMessage }) => {
      // given - when
      const createLottoReward = () => LottoReward.from(lottoMatchingInfo);
      // then
      expect(() => createLottoReward()).toThrow(expectedErrorType);
      expect(() => createLottoReward()).toThrow(expectedErrorMessage);
    },
  );
});
