import { ERROR_MESSAGE } from '@step1/constants/message';
import { LottoError } from '@step1/errors';
import { isValidTypeOfNumbers } from '@step1/utils/validate/common/number';
import {
  isDefaultLottoCount,
  isDuplicateLottoNumbers,
  isValidLottoNumbersRange,
  isValidWinningCountRange,
} from '@step1/utils/validate/lotto/lottoValidate';

const throwIfInvalid = (condition: boolean, errorMessage: string) => {
  if (condition) {
    throw new LottoError(errorMessage);
  }
};

const LottoValidator = {
  validateLottoNumbersInRange(lottoNumbers: number[]) {
    throwIfInvalid(!isValidLottoNumbersRange(lottoNumbers), ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
  },
  validateDuplicateLottoNumbers(lottoNumbers: number[]) {
    throwIfInvalid(isDuplicateLottoNumbers(lottoNumbers), ERROR_MESSAGE.DUPLICATE_LOTTO_NUMBERS);
  },
  validateDefaultLottoCount(lottoNumbers: number[]) {
    throwIfInvalid(!isDefaultLottoCount(lottoNumbers), ERROR_MESSAGE.NOT_DEFAULT_LIMIT_LOTTO_COUNT);
  },
  validateTypeOfNumbers(lottoNumbers: number[]) {
    throwIfInvalid(!isValidTypeOfNumbers(lottoNumbers), ERROR_MESSAGE.TYPE_OF_NUMBER);
  },
  validateWinningCountInRange(winningCounts: number[]) {
    throwIfInvalid(
      winningCounts.some((winningCount) => !isValidWinningCountRange(winningCount)),
      ERROR_MESSAGE.INVALID_WINNING_COUNT,
    );
  },
};

export default LottoValidator;
