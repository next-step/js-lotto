import { DEFAULT_LIMIT_LOTTO_COUNT, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../constants/lotto.js';
import { RandomNumberGenerator } from '../utils/generator/randomNumberGenerator.js';

export default class LottoNumberMaker {
  #lottoNumberGenerator;

  static #lottoRangeInfo = {
    startNumber: MIN_LOTTO_NUMBER,
    endNumber: MAX_LOTTO_NUMBER,
    count: DEFAULT_LIMIT_LOTTO_COUNT,
  };

  constructor(lottoNumberGenerator = RandomNumberGenerator) {
    this.#lottoNumberGenerator = lottoNumberGenerator;
  }

  static from() {
    return new LottoNumberMaker();
  }

  createLottoNumbers() {
    const { startNumber, endNumber, count } = LottoNumberMaker.#lottoRangeInfo;
    return this.#lottoNumberGenerator.pickNumbersInRange({
      startNumber,
      endNumber,
      count,
    });
  }
}
