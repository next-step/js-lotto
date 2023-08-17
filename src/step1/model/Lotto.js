import { SYMBOLS } from '../constants/commons.js';
import LottoValidator from '../utils/validate/validator/LottoValidator.js';
import LottoNumberMaker from './LottoNumberMaker.js';

/**
 * "로또 생성"이라는 도메인을 갖는 클래스
 */
export default class Lotto {
  /**
   * 1~45의 숫자 범위에서 6개인 로또 숫자들을 나타내는 private field
   */
  #lottoNumbers;

  constructor(lottoNumbers) {
    this.#validate(lottoNumbers);
    this.#lottoNumbers = lottoNumbers;
  }

  /**
   * count를 받아 Lotto - LottoMerchant 간 "로또 번호 생성"에 대한 협력을 위한 정적 팩토리 메서드
   * @param {number} count - 로또 생성 횟수
   * @returns {Lotto[]} 생성 횟수 만큼의 로또 인스턴스 배열
   */
  static fromByRandomNumberMaker(count = 1) {
    const lottoNumberMaker = LottoNumberMaker.from();
    return Array.from({ length: count }, () => new Lotto(lottoNumberMaker.createLottoNumbers()));
  }

  /**
   * 생성한 로또 번호들이 숫자 타입인지, 번호의 갯수가 6개인지, 로또 번호 내 중복된 값이 존재하는지, 1 ~ 45의 숫자 범위를 갖는지 검증하는 메서드
   * @param {number[]} lottoNumbers - 로또 번호
   */
  #validate(lottoNumbers) {
    LottoValidator.validateTypeOfNumbers(lottoNumbers);
    LottoValidator.validateDefaultLottoCount(lottoNumbers);
    LottoValidator.validateDuplicateLottoNumbers(lottoNumbers);
    LottoValidator.validateLottoNumbersInRange(lottoNumbers);
  }

  /**
   * 로또 번호에 대한 string을 받아 "로또 번호 생성"에 대한 협력을 위한 정적 팩토리 메서드
   * @param {string} string 특정 구분자로 나타낸 로또 번호 string
   * @param {string} seperator - string을 split할 구분자
   * @returns {Lotto} 로또 인스턴스
   */
  static fromByString(string, seperator = SYMBOLS.COMMA) {
    return new Lotto(string.split(seperator).map(Number));
  }

  /**
   * lottoNumbers 필드를 반환하기 위한 getter 메서드
   * @returns {number[]} 1 ~ 45의 범위를 가지는 6개의 로또 번호 들을 반환
   */
  getLottoNumbers() {
    return this.#lottoNumbers;
  }
}
