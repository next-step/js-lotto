import { SYMBOLS } from '@step1/constants/commons';
import { GAME_PROMPT } from '@step1/constants/controller';
import { ERROR_MESSAGE } from '@step1/constants/message';
import { NUMBER_TERMS } from '@step1/constants/number';
import AppError from '@step1/errors/AppError';

const LottoGameControllerValidator = {
  validateInitializeValue(inputValue: string) {
    if (inputValue.length === NUMBER_TERMS.ZERO) {
      throw new AppError(ERROR_MESSAGE.INVALID_INPUT);
    }
    if (inputValue.includes(SYMBOLS.SPACE)) {
      throw new AppError(ERROR_MESSAGE.NOT_SPACES);
    }
  },
  validateEndCount(endCount: string) {
    this.validateInitializeValue(endCount);
    if (endCount !== GAME_PROMPT.END_GAME && endCount !== GAME_PROMPT.RESTART_GAME) {
      throw new AppError(ERROR_MESSAGE.INVALID_END_COUNT);
    }
  },
};

export default LottoGameControllerValidator;
