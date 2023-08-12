import { DEFAULT_LIMIT_LOTTO_COUNT, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../constants/lotto.js';
import { RandomNumberGenerator } from './generator/index.js';

const LottoNumberMaker = {
  createNumbers() {
    return RandomNumberGenerator.pickNumbersInRange({
      startNumber: MIN_LOTTO_NUMBER,
      endNumber: MAX_LOTTO_NUMBER,
      count: DEFAULT_LIMIT_LOTTO_COUNT,
    });
  },
};

export default LottoNumberMaker;
