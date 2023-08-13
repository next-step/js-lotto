import { ERROR_MESSAGE } from '../../../constants/message.js';
import { LottoError } from '../../../errors/index.js';
import { isValidTypeOfNumbers } from '../common/number.js';
import {
  isDefaultLottoCount,
  isDuplicateLottoNumbers,
  isValidLottoNumbersRange,
  isValidWinningCountRange,
} from '../lotto/lottoValidate.js';

const throwIfInvalid = (condition, errorMessage) => {
  if (condition) {
    throw new LottoError(errorMessage);
  }
};

const LottoValidator = {
  validateLottoNumbersInRange(lottoNumbers) {
    throwIfInvalid(!isValidLottoNumbersRange(lottoNumbers), ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
  },
  validateDuplicateLottoNumbers(lottoNumbers) {
    throwIfInvalid(isDuplicateLottoNumbers(lottoNumbers), ERROR_MESSAGE.DUPLICATE_LOTTO_NUMBERS);
  },
  validateDefaultLottoCount(lottoNumbers) {
    throwIfInvalid(!isDefaultLottoCount(lottoNumbers), ERROR_MESSAGE.NOT_DEFAULT_LIMIT_LOTTO_COUNT);
  },
  validateTypeOfNumbers(lottoNumbers) {
    throwIfInvalid(!isValidTypeOfNumbers(lottoNumbers), ERROR_MESSAGE.TYPE_OF_NUMBER);
  },
  validateWinningCountInRange(lottoResults) {
    throwIfInvalid(
      lottoResults.some(([winningCount]) => !isValidWinningCountRange(winningCount)),
      ERROR_MESSAGE.INVALID_WINNING_COUNT,
    );
  },
};

export default LottoValidator;
