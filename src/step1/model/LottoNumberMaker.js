import { DEFAULT_LIMIT_LOTTO_COUNT, MAX_LOTTO_NUMBER, MIN_LOTTO_NUMBER } from '../constants/lotto.js';
import { RandomNumberGenerator } from '../utils/generator/randomNumberGenerator.js';

/**
 * "로또 번호 생성"이라는 도메인을 가진 클래스
 */
export default class LottoNumberMaker {
  #lottoNumberGenerator;

  /**
   * @type {import('../utils/jsDoc.js').LottoRangeInfo}
   */
  static #lottoRangeInfo = {
    startNumber: MIN_LOTTO_NUMBER,
    endNumber: MAX_LOTTO_NUMBER,
    count: DEFAULT_LIMIT_LOTTO_COUNT,
  };

  /**
   *
   * @param {object} lottoNumberGenerator - pickNumbersInRange 메서드를 갖는 객체
   */
  constructor(lottoNumberGenerator = RandomNumberGenerator) {
    this.#lottoNumberGenerator = lottoNumberGenerator;
  }

  /**
   * 네이밍을 위한 정적 팩토리 메서드
   * @returns {LottoNumberMaker} LottoNumberMaker 인스턴스
   */
  static from() {
    return new LottoNumberMaker();
  }

  /**
   * Lotto - LottoNumberMaker 간 "로또 번호 생성"에 대한 협력을 위해 lottoRangeInfo 내 정보를 통해 로또 번호들을 생성하는 메서드
   * @returns {number[]} 생성한 로또 번호들 (ex) [1,2,3,4,5,6])
   */
  createLottoNumbers() {
    const { startNumber, endNumber, count } = LottoNumberMaker.#lottoRangeInfo;
    return this.#lottoNumberGenerator.pickNumbersInRange({
      startNumber,
      endNumber,
      count,
    });
  }
}
