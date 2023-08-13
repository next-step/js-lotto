import { DEFAULT_LIMIT_LOTTO_COUNT, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../constants/lotto.js';
import { RandomNumberGenerator } from '../utils/generator/randomNumberGenerator.js';

export default class LottoNumberMaker {
  #lottoNumberGenerator;

  #lottoRangeInfo;

  constructor(
    { startNumber, endNumber, count, lottoNumberGenerator = RandomNumberGenerator } = {
      startNumber: MIN_LOTTO_NUMBER,
      endNumber: MAX_LOTTO_NUMBER,
      count: DEFAULT_LIMIT_LOTTO_COUNT,
      lottoNumberGenerator: RandomNumberGenerator,
    },
  ) {
    this.#lottoNumberGenerator = lottoNumberGenerator;
    this.#lottoRangeInfo = { startNumber, endNumber, count };
  }

  static fromByLottoRangeInfo({ startNumber, endNumber, count }) {
    return new LottoNumberMaker({ startNumber, endNumber, count });
  }

  createLottoNumbers() {
    const { startNumber, endNumber, count } = this.#lottoRangeInfo;
    return this.#lottoNumberGenerator.pickNumbersInRange({
      startNumber,
      endNumber,
      count,
    });
  }
}
