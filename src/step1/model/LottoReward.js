import { LottoValidator } from '../utils/validate/validator/index.js';

/**
 * "로또 당첨"이라는 도메인에 대한 클래스
 */
export default class LottoReward {
  #lottoMatchingInfo;

  /**
   * @type {WinTable}
   */
  static #WIN_TABLE = {
    '3_NUMBER': {
      description: '3개 일치 (5,000원)',
      amount: 5_000,
    },
    '4_NUMBER': {
      description: '4개 일치 (50,000원)',
      amount: 50_000,
    },
    '5_NUMBER': {
      description: '5개 일치 (1,500,000원)',
      amount: 1_500_000,
    },
    '5_NUMBER_WITH_BONUS': {
      description: '5개 일치, 보너스 볼 일치 (30,000,000원)',
      amount: 30_000_000,
    },
    '6_NUMBER': {
      description: '6개 일치 (2,000,000,000원)',
      amount: 2_000_000_000,
    },
  };

  constructor(lottoMatchingInfo) {
    this.#validate(lottoMatchingInfo);
    this.#lottoMatchingInfo = lottoMatchingInfo;
  }

  /**
   * "로또 당첨 정보"내 "당첨 횟수"가 0~6 사이의 값을 가지고 있는지 검증하는 메서드
   * @param {LottoMatchingInfo} lottoMatchingInfo - "당첨 횟수, 보너스 번호 일치 여부"에 대한 객체
   */
  #validate(lottoMatchingInfo) {
    LottoValidator.validateWinningCountInRange(lottoMatchingInfo.map(({ winningCount }) => winningCount));
  }

  /**
   * 네이밍을 위한 정적 팩토리 메서드
   * @param {LottoMatchingInfo} 로또 당첨 정보
   */
  static from(lottoMatchingInfo) {
    return new LottoReward(lottoMatchingInfo);
  }

  /**
   * LottoResult 객체의 형태로 초기화 하는 메서드
   * @returns {LottoResult}
   */
  #initLottoResult() {
    return Object.values(LottoReward.#WIN_TABLE).reduce((result, { description }) => {
      result[description] = 0;
      return result;
    }, {});
  }

  /**
   * lottoMatchingInfo를 통해 WIN_TABLE에 접근 하기 위한 key를 생성하는 메서드
   * @param {LottoMatchingInfo} LottoMatchingInfo
   */
  #createWinTableKey({ winningCount, hasBonusNumber }) {
    return `${winningCount}_NUMBER${hasBonusNumber && winningCount === 5 ? '_WITH_BONUS' : ''}`;
  }

  /**
   * winTable 키를 통해 만약 해당 키가 WIN_TABLE에 존재한다면 해당 description 값에 1을 더하는 메서드
   * @param {LottoResult} lottoResult - "로또 당첨 조건 - 당첨 횟수"로 이루어진 객체
   * @param {string} winTableKey - createWinTableKey로 생성한 key
   * @returns {LottoResult} update된 lottoResult
   */
  #updateLottoResult(lottoResult, winTableKey) {
    if (winTableKey in LottoReward.#WIN_TABLE) {
      const { description } = LottoReward.#WIN_TABLE[winTableKey];
      lottoResult[description] += 1;
    }
    return lottoResult;
  }

  /**
   * winTable 키를 통해 만약 해당 키가 WIN_TABLE에 존재 시 당첨 금액 만큼 winningAmount를 업데이트 하는 메서드
   * @param {number} winningAmount - update 전 총 당첨 금액
   * @param {string} winTableKey - createWinTableKey로 생성한 key
   * @returns {number} update 된 총 당첨 금액
   */
  #calculateWinningAmount(winningAmount, winTableKey) {
    if (winTableKey in LottoReward.#WIN_TABLE) {
      const { amount } = LottoReward.#WIN_TABLE[winTableKey];
      winningAmount += amount;
    }
    return winningAmount;
  }

  /**
   * lottoMatchInfo를 통해 WIN_TABLE에 접근할 key를 생성 후 WinningInfo를 update하는 메서드
   * @returns {WinningInfo}
   */
  #updateWinningInfo({ winningCount, hasBonusNumber, lottoResult, winningAmount }) {
    const winTableKey = this.#createWinTableKey({ winningCount, hasBonusNumber });
    return {
      lottoResult: this.#updateLottoResult(lottoResult, winTableKey),
      winningAmount: this.#calculateWinningAmount(winningAmount, winTableKey),
    };
  }

  /**
   * Bank - LottoReward 간 "로또 당첨 결과 확인" 이라는 협력을 위해 lottoMatchingInfo를 통해 당첨 정보를 계산 후 반환하는 메서드
   * @returns {WinningInfo}
   */
  calculateWinningInfo() {
    return this.#lottoMatchingInfo.reduce(
      ({ lottoResult, winningAmount }, { winningCount, hasBonusNumber }) =>
        this.#updateWinningInfo({ winningCount, hasBonusNumber, lottoResult, winningAmount }),
      { lottoResult: this.#initLottoResult(), winningAmount: 0 },
    );
  }
}
