import { ERROR_MESSAGE } from '../../../constants/message.js';
import { LottoError } from '../../../errors/index.js';
import { isValidTypeOfNumbers } from '../common/number.js';
import {
  isDefaultLottoCount,
  isDuplicateLottoNumbers,
  isValidLottoNumbersRange,
  isValidWinningCountRange,
} from '../lotto/lottoValidate.js';

const LottoValidator = {
  validateLottoNumbersInRange(lottoNumbers) {
    if (!isValidLottoNumbersRange(lottoNumbers)) {
      throw new LottoError(ERROR_MESSAGE.INVALID_LOTTO_NUMBER_RANGE);
    }
  },
  validateDuplicateLottoNumbers(lottoNumbers) {
    if (isDuplicateLottoNumbers(lottoNumbers)) {
      throw new LottoError(ERROR_MESSAGE.DUPLICATE_LOTTO_NUMBERS);
    }
  },
  validateDefaultLottoCount(lottoNumbers) {
    if (!isDefaultLottoCount(lottoNumbers)) {
      throw new LottoError(ERROR_MESSAGE.NOT_DEFAULT_LIMIT_LOTTO_COUNT);
    }
  },
  validateTypeOfNumbers(lottoNumbers) {
    if (!isValidTypeOfNumbers(lottoNumbers)) {
      throw new LottoError(ERROR_MESSAGE.TYPE_OF_NUMBER);
    }
  },
  validateWinningCountInRange(lottoResults) {
    if (lottoResults.some(([winningCount]) => !isValidWinningCountRange(winningCount))) {
      throw new LottoError(ERROR_MESSAGE.INVALID_WINNING_COUNT);
    }
  },
};

export default LottoValidator;
