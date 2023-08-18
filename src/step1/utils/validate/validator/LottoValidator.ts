import { ERROR_MESSAGE } from '../../../constants/message';
import { LottoError } from '../../../errors';
import { isValidTypeOfNumbers } from '../common/number';
import {
  isDefaultLottoCount,
  isDuplicateLottoNumbers,
  isValidLottoNumbersRange,
  isValidWinningCountRange,
} from '../lotto/lottoValidate';

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
