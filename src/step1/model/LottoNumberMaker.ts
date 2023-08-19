import { LOTTO_TERMS } from '@step1/constants/lotto';
import { RandomNumberGeneratorInterface } from '@step1/utils/generator/generator.type';
import { RandomNumberGenerator } from '@step1/utils/generator/randomNumberGenerator';
import { LottoRangeInfo } from '@step1/utils/jsDoc';

/**
 * "로또 번호 생성"이라는 도메인을 가진 클래스
 */
export default class LottoNumberMaker {
  #lottoNumberGenerator: RandomNumberGeneratorInterface;

  /**
   * @type {LottoRangeInfo}
   */
  static #lottoRangeInfo: LottoRangeInfo = {
    startNumber: LOTTO_TERMS.MIN_LOTTO_NUMBER,
    endNumber: LOTTO_TERMS.MAX_LOTTO_NUMBER,
    count: LOTTO_TERMS.DEFAULT_LIMIT_LOTTO_COUNT,
  };

  constructor(lottoNumberGenerator: RandomNumberGeneratorInterface = RandomNumberGenerator) {
    this.#lottoNumberGenerator = lottoNumberGenerator;
  }

  /**
   * 네이밍을 위한 정적 팩토리 메서드
   * @returns {LottoNumberMaker} LottoNumberMaker 인스턴스
   */
  static from(): LottoNumberMaker {
    return new LottoNumberMaker();
  }

  /**
   * Lotto - LottoNumberMaker 간 "로또 번호 생성"에 대한 협력을 위해 lottoRangeInfo 내 정보를 통해 로또 번호들을 생성하는 메서드
   * @returns {number[]} 생성한 로또 번호들 (ex) [1,2,3,4,5,6])
   */
  createLottoNumbers(): number[] {
    const { startNumber, endNumber, count } = LottoNumberMaker.#lottoRangeInfo;
    return this.#lottoNumberGenerator.pickNumbersInRange({
      startNumber,
      endNumber,
      count,
    });
  }
}
