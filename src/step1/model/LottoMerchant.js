import { PRICE_PER_LOTTO } from '../constants/lotto.js';
import { ERROR_MESSAGE } from '../constants/message.js';
import { LottoError } from '../errors/index.js';
import { isValidTypeOfNumber } from '../utils/validate/common/number.js';
import { isLessThenPricePerLotto } from '../utils/validate/lotto/lottoValidate.js';
import { Lotto } from './index.js';

/**
 * "로또 판매"라는 도메인을 갖는 클래스
 */
export default class LottoMerchant {
  /**
   * 구매자로부터 받은 금액을 나타내는 private field
   */
  #receivedAmount;

  constructor(receivedAmount) {
    this.#validate(receivedAmount);
    this.#receivedAmount = receivedAmount;
  }

  /**
   * 네이밍을 위한 정적 팩토리 메서드
   * @param {number} receivedAmount - 구매금액
   * @returns {LottoMerchant} LottoMerchant 인스턴스
   */
  static from(receivedAmount) {
    return new LottoMerchant(receivedAmount);
  }

  /**
   * 받은 금액이 숫자 인지, 로또 구매 최소 금액을 충족하는지, 1000원으로 나누어 떨어지는지 검증하는 메서드
   * @param {number} receivedAmount - 구매 금액
   */
  #validate(receivedAmount) {
    if (!isValidTypeOfNumber(receivedAmount)) {
      throw new LottoError(ERROR_MESSAGE.TYPE_OF_NUMBER);
    }
    if (isLessThenPricePerLotto(receivedAmount)) {
      throw new LottoError(ERROR_MESSAGE.GREATER_THEN_PRICE_PER_LOTTO);
    }
    if (receivedAmount % PRICE_PER_LOTTO !== 0) {
      throw new LottoError(ERROR_MESSAGE.NO_CHANGES);
    }
  }

  /**
   * 구매 금액 만큼 로또 생성 횟수를 계산 후 반환
   * @returns {number} 로또 생성 횟수
   */
  #createLottoCount() {
    return Math.floor(this.#receivedAmount / PRICE_PER_LOTTO);
  }

  /**
   * 구매자 - 판매자 간 "로또 판매"라는 협력에 대한 메서드
   * @returns {Lotto[]} 구매 가격만큼의 로또
   */
  sellLotto() {
    return Lotto.fromByRandomNumberMaker(this.#createLottoCount());
  }
}
