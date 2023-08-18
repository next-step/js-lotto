/**
 * "당첨 로또 정보(당첨 로또 번호, 보너스 번호)"에 대한 객체
 * @typedef {object} WinningLottoInfo
 * @property {number[]} winningLottoNumbers - 당첨 로또 번호
 * @property {number} bonusNumber - 보너스 번호
 */

/**
 * "당첨 횟수, 보너스 번호 일치 여부"에 대한 객체
 * @typedef {object} LottoMatchingInfo
 * @property {number} winningCount - 당첨 횟수
 * @property {boolean} hasBonusNumber - 보너스 번호가 일치하는지의 여부
 */

/**
 * "로또 당첨 조건 - 당첨 횟수"로 이루어진 Dictionary 형태의 객체
 * @typedef {Record<LottoResultKey, number>} LottoResult
 */

/**
 * "당첨 정보"에 대한 객체
 * @typedef {object} WinningInfo
 * @property {LottoResult} lottoResult - 로또 당첨 결과
 * @property {string} rateOfReturn - 수익률
 */

/**
 * "로또 당첨 테이블"에 대한 객체
 * @typedef {object} WinTableEntry
 * @property {'3개 일치 (5,000원)' | '4개 일치 (50,000원)' | '5개 일치 (1,500,000원)' | '5개 일치, 보너스 볼 일치 (30,000,000원)' | '6개 일치 (2,000,000,000원)'} description - 당첨 조건 설명 (예: '3개 일치 (5,000원)')
 * @property {5000 | 50000 | 1500000 | 30000000 | 2000000000} amount - 당첨 금액
 */

/**
 * "로또 당첨 조건 설명 및 당첨 금액"에 대한 Dictionary 형태의 객체
 * @typedef {Record<WinTableKey, WinTableEntry>} WinTable
 */

/**
 * "당첨 보상 정보"에 대한 객체
 * @typedef {object} WinningRewardInfo
 * @property {LottoResult} lottoResult - 로또 당첨 결과
 * @property {number} winningAmount - 당첨 된 총 금액
 */

/**
 * 생성할 로또의 최소 번호, 최대 번호, 생성할 로또 갯수에 대한 객체
 * @typedef {object} LottoRangeInfo
 * @property {number} startNumber - 최소 번호
 * @property {number} endNumber - 최대 번호
 * @property {number} count - 생성할 로또 번호 갯수
 */

/**
 * LottoReward 내 존재하는 WinTable에 접근하기 위한 key
 * @typedef {'3_NUMBER' | '4_NUMBER' | '5_NUMBER' | '5_NUMBER_WITH_BONUS' | '6_NUMBER'} WinTableKey
 */

/**
 * 로또 당첨 결과에 대한 key
 * @typedef {WinTableEntry['description']} LottoResultKey
 */

export {};
